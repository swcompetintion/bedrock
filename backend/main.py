import os
from .core.url import FRONTEND_PATHS
from fastapi import FastAPI
from contextlib import asynccontextmanager
# CORS 미들웨어를 임포트합니다.
from fastapi.middleware.cors import CORSMiddleware

from backend.database.connection import initialize_database
from .routes.plans import plan_router
from .routes.auths import auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 데이터베이스 초기화는 애플리케이션 시작 시 한 번만 수행됩니다.
    await initialize_database()
    yield
    # 애플리케이션 종료 시 필요한 정리 작업이 있다면 여기에 추가합니다.


app = FastAPI(
    lifespan=lifespan
)


origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://13.223.42.90:3000",
    "http://13.223.42.90:8000",
    "https://13.223.42.90:3000",
    "https://13.223.42.90:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


REACT_BUILD_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "..", "frontend/dist")

app.include_router(plan_router)
app.include_router(auth_router)


# FRONTEND_PATHS는 정적 파일이나 다른 마운트 설정을 포함하는 것으로 보입니다.
for FRONTEND_PATH in FRONTEND_PATHS:
    app.mount(**FRONTEND_PATH)

# 만약 React 빌드 디렉토리의 정적 파일도 제공해야 한다면 아래와 같이 추가할 수 있습니다.
# from fastapi.staticfiles import StaticFiles
# app.mount("/static", StaticFiles(directory=REACT_BUILD_DIR), name="static")
# 또는 프론트엔드 라우팅 처리를 위한 Catch-all 라우트 설정 등...
# 이는 FRONTEND_PATHS의 내용에 따라 달라집니다.
