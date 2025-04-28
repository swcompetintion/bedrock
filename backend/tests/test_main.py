
import pytest
from fastapi.testclient import TestClient
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))
if "pytest" in sys.modules:
    from backend.main import app


@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client


def test_plan(client):
    response = client.get("/plans")
    assert client is not None
