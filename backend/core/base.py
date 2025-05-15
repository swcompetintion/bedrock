

class Plan:
    """데이터의 구조(베이이스 모델)"""
    id: int
    title: str | None = None
    description: str | None = None
    tags: list[str] | None = None
    location: str | None = None
    created_at: str | None = None
