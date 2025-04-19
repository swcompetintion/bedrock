# main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()


# React 앱 빌드 결과 폴더 경로
REACT_BUILD_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "frontend/dist")

# 정적 파일 마운트
app.mount("/", StaticFiles(directory=REACT_BUILD_DIR, html=True), name="static")
