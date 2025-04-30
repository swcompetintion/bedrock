from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie, Document
from backend.core.config import settings
from backend.models.plans import PlanModel
from backend.schemas.plans import PlanUpdate


async def initialize_database():
    try:
        client = AsyncIOMotorClient(settings.DATABASE_URL)
        await init_beanie(
            database=client.get_default_database(),
            document_models=[PlanModel]
        )
        print("데이터베이스 연결 성공!!! ㅠㅠㅠㅠㅠㅠㅠ")
    except Exception as e:
        print(f"데이터베이스 연결 실패: {e}")


class Database:
    def __init__(self, model: Document):
        self.model = model

    async def save(self, document: Document) -> None:
        await document.create()
        return

    async def get_all(self) -> list:
        """모든 이벤트 가져오는 메서드"""
        docs = await self.model.find_all().to_list()
        return docs

    async def delete(self, id: int):
        doc = await self.model.get(id)
        await doc.delete()

    async def get(self, id: int):
        doc = await self.model.get(id)
        return doc

    async def update(self, id: int, body: PlanUpdate):
        doc = await self.model.get(id)
        body = body.model_dump()
        body = {"$set": {k: v for k, v in body.items() if v is not None}}
        await doc.update(body)
