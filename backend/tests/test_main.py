import pytest
from fastapi.testclient import TestClient
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))


if "pytest" in sys.modules:
    from backend.models.plans import Plan
    from backend.main import app

    @pytest.fixture
    def clients():
        return TestClient(app)

    def test_create_todo(clients):
        with clients as client:
            response = client.get("/plans")
            assert response.status_code == 404
