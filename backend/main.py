import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from fastapi import FastAPI
from backend.database.connection import initialize_database
from .routes.plans import plan_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_database()
    yield


app = FastAPI(
    lifespan=lifespan
)

# React 앱 빌드 결과 폴더 경로 (상위 디렉토리)
REACT_BUILD_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "..", "frontend/dist")

# 정적 파일 마운트
app.include_router(plan_router)
app.mount("/", StaticFiles(directory=REACT_BUILD_DIR, html=True), name="static")
