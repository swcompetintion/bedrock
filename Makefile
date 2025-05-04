FRONTEND_DIR=frontend
BACKEND_DIR=backend


.PHONY: init install-backend install-frontend run-backend run-frontend
init:
	@echo "Entering Venv..."
	poetry shell

install-backend:
	@echo "Installing backend dependencies..."
	cd $(BACKEND_DIR) && poetry install

install-frontend:
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

run-backend:
	@echo "Running FastAPI backend... And Building bundle.js"
	npm --prefix frontend run build
	uvicorn $(BACKEND_DIR).main:app --reload

run-frontend:
	@echo "Running React frontend..."
	cd $(FRONTEND_DIR) && npm start
