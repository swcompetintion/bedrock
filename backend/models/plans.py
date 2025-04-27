from pydantic import BaseModel, ConfigDict
from beanie import Document


class Plan(Document):
    id: int
    title: str
    image: str
    description: str
    tags: list[str]
    location: str
    created_at: str

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "id": 1,
                "title": "아.. 강의하기 싫다",
                "image": "path/to",
                "description": "아 진짜 하기 싫다...",
                "tags": ["#귀차니즘", "#강의"],
                "location": "제1실습관 207호",
                "created_at": "2023-10-01T12:00:00Z"
            }
        }
    )


class PlanUpdate(BaseModel):
    title: str | None = None
    image: str | None = None
    description: str | None = None
    tags: list[str] | None = None
    location: str | None = None
