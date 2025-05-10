.PHONY: build up down clean run-backend run-frontend

all: build up

build:
	@echo "이미지를 만드는중임"
	docker compose build

up:
	@echo "폴더 없으면 만듬 요기에 디비 데이터 저장할거임"
	mkdir -p ./mongo-data 
	@echo "이미지를 실행중임"
	docker compose up -d

down:
	@echo "끕니다잉"
	docker compose down

clean:
	@echo ">>> 볼륨빼고 싹다 지우는겨"
	docker system prune -f --volumes

run-backend:
	@echo "번들js 빌드중임"
	npm --prefix frontend run build
	@echo "백엔드 시작중ㄷ"
	poetry run uvicorn backend.main:app --reload

run-frontend:
	@echo "dev파일 빌드중임"
	npm --prefix frontend start

