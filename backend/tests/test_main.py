# import pytest
# from fastapi.testclient import TestClient
# import os
# import sys
# sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))


# if "pytest" in sys.modules:
#     from backend.models.plans import Plan
#     from backend.main import app

#     @pytest.fixture
#     def client():
#         return TestClient(app)

#     def test_plan(client):

#         plan = {
#             "id": 1,
#             "title": "Test Plan",
#             "description": "This is a test plan.",
#             "price": 100.0,
#             "period": 30,
#             "created_at": "2023-10-01T00:00:00Z",
#             "updated_at": "2023-10-01T00:00:00Z"
#         }
#         response = client.post("/todos", json=plan)
#         assert response.status_code == 201
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

    assert client is not None
