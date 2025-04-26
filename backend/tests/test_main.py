# tests/test_main.py
import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from backend.main import app, UserService


@pytest.fixture
def client():
    return TestClient(app)


def test_read_user(client):
    # UserService를 Mock 객체로 교체
    mock_user_service = MagicMock()
    mock_user_service.get_user.return_value = {"id": 1, "name": "Mocked User"}

    # FastAPI 애플리케이션에 Mock 객체 주입
    app.dependency_overrides[UserService] = lambda: mock_user_service

    response = client.get("/users/1")
    assert response.status_code == 200
    assert response.json() == {"id": 1, "name": "Mocked User"}

    # Mock 메서드가 호출되었는지 확인
    mock_user_service.get_user.assert_called_once_with(1)
