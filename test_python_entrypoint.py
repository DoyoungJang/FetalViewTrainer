"""Run with: python -m unittest test_python_entrypoint.py"""

import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from streamlit.testing.v1 import AppTest

import main as launcher

ROOT = Path(__file__).resolve().parent


class PythonEntrypointTests(unittest.TestCase):
    def test_streamlit_renders_local_component(self):
        for filename in ("app.py", "main.py"):
            with self.subTest(entrypoint=filename):
                result = AppTest.from_file(str(ROOT / filename)).run(timeout=20)
                self.assertFalse(result.exception, str(result.exception))
                component = result.get("component_instance")[0]
                self.assertTrue(component.proto.component_name.endswith("fetalview"))
                self.assertEqual(json.loads(component.proto.json_args)["height"], 1000)

    def test_launcher_works_outside_repository(self):
        with tempfile.TemporaryDirectory() as folder:
            previous = Path.cwd()
            try:
                os.chdir(folder)
                with patch.dict(os.environ, {"PORT": "8765", "HOST": "127.0.0.1"}), patch.object(launcher.subprocess, "run") as execute:
                    execute.return_value.returncode = 0
                    with self.assertRaises(SystemExit) as exit_result:
                        launcher.main()
                    self.assertEqual(exit_result.exception.code, 0)
                arguments = execute.call_args.args[0]
                self.assertEqual(arguments[1:4], ["-m", "streamlit", "run"])
                self.assertEqual(Path(arguments[4]), ROOT / "app.py")
                self.assertIn("--server.port=8765", arguments)
                self.assertIn("--server.address=127.0.0.1", arguments)
            finally:
                os.chdir(previous)

    def test_invalid_port_does_not_start_server(self):
        with patch.dict(os.environ, {"PORT": "0"}), patch.object(launcher.subprocess, "run") as execute:
            with self.assertRaises(ValueError):
                launcher.main()
            execute.assert_not_called()


if __name__ == "__main__":
    unittest.main()
