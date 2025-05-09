from pydantic import ConfigDict
from pydantic_settings import BaseSettings
from pathlib import Path
BASE_DIR = Path(__file__).parent.parent.parent


class Settings(BaseSettings):
    DATABASE_URL: str | None

    model_config = ConfigDict(
        env_file=BASE_DIR/".env",
    )


settings = Settings()
