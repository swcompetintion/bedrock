from pathlib import Path
from fastapi.staticfiles import StaticFiles
REACT_BUILD_DIR = Path(__file__).parent.parent.parent/"frontend/dist"
NAME = 'static'
STATIC_FILES = StaticFiles(directory=REACT_BUILD_DIR, html=True) # React 빌드 결과물의 경로에 해당하는 파일이 없으면 index.html 리턴
PATHS = ('{user_id}', '')
FRONTEND_PATHS = ({'path': f"/{PATH}",
                   'app': STATIC_FILES, 'name': NAME} for PATH in PATHS)
