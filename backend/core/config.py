from pydantic import ConfigDict 
from pydantic_settings import BaseSettings
from pathlib import Path
BASE_DIR = Path(__file__).parent.parent.parent # 부모의 부모의 부모 경로, 즉 프로젝트폴더의 경로를 가져온다


class Settings(BaseSettings):
    """환경변수 값을 가져온다"""
    DATABASE_URL: str | None # str 또는 None값을 받는다

    model_config = ConfigDict(
        env_file=BASE_DIR/".env",
    ) # BASE_DIR /.env라고 경로 지정 ( 환경 변수 로드용용)


settings = Settings() # Settings 클래스를 인스턴스화하여 설정 객체 생성

