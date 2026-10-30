"""Launch with ``python main.py`` on hosts that expect a Python command."""

import os
from pathlib import Path
import subprocess
import sys


def main() -> None:
    port = int(os.environ.get("PORT", "8501"))
    if not 1 <= port <= 65535:
        raise ValueError("PORT must be between 1 and 65535")
    app = Path(__file__).resolve().with_name("app.py")
    result = subprocess.run([
        sys.executable, "-m", "streamlit", "run", str(app),
        "--server.headless=true",
        "--server.address=" + os.environ.get("HOST", "0.0.0.0"),
        "--server.port=" + str(port),
        "--browser.gatherUsageStats=false",
    ], check=False)
    raise SystemExit(result.returncode)


if __name__ == "__main__":
    from streamlit.runtime.scriptrunner import get_script_run_ctx

    if get_script_run_ctx(suppress_warning=True) is not None:
        # Some deployment services select main.py automatically. Avoid starting
        # a second server when this file is already run by Streamlit.
        from app import main as render_app
        render_app()
    else:
        main()
