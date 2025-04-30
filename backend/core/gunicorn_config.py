from pathlib import Path

CONFIG_DIR = Path(__file__).parent
PROJECT_ROOT = CONFIG_DIR
SOCKET_PATH = PROJECT_ROOT / "app.sock"
worker_class = "uvicorn.workers.UvicornWorker"
workers = 4
bind = f"unix:{SOCKET_PATH}"
