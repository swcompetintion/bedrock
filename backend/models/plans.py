from pydantic import ConfigDict
from backend.core.base import Plan
from beanie import Document


class PlanModel(Plan, Document):
    """DB 저장/조회기능을 붙인 DB모델"""
    id: int
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "id": 1,
                "title": "Plan",
                "description": "Plan",
                "tags": ["#test", "#Plan"],
                "location": "삼육대",
                "created_at": "2023-10-01T12:00:00Z"
            }
        }
    )
