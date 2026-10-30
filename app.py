"""Streamlit entrypoint serving the checked-out FetalView frontend and assets."""

from pathlib import Path

import streamlit as st
from streamlit.components.v1 import declare_component


def main() -> None:
    st.set_page_config(
        page_title="FetalView — 태아 초음파 학습 스튜디오",
        page_icon="🩺",
        layout="wide",
        initial_sidebar_state="collapsed",
    )
    frontend = Path(__file__).resolve().parent / "dist"
    if not (frontend / "index.html").is_file():
        st.error("앱 파일을 찾을 수 없습니다. 저장소의 dist 폴더를 함께 배포하세요.")
        st.stop()

    # A local component serves JS modules, GLB models and images from the same
    # checkout. An HTML string or a remote iframe would break relative assets
    # or show a different revision of the application.
    fetalview = declare_component("fetalview", path=str(frontend))
    fetalview(height=1000, key="fetalview-studio", default=None)


if __name__ == "__main__":
    main()
