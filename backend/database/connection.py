from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie, Document
from backend.core.config import settings
from backend.models.plans import PlanModel
from backend.schemas.plans import PlanUpdate


async def initialize_database():
    """"""
    try:
        URL = settings.DATABASE_URL.replace("\\x3a", ':') # DB URL에 \\x3a가 있는데 형식이 : 이렇게 되야하나 봄
        client = AsyncIOMotorClient(URL) # 몽고DB에 비동기적으로 연결
        await init_beanie(
            database=client.get_default_database(), # 몽고 디비 url에서 기본 데이터베이스 이름 자동 추출
            document_models=[PlanModel] 
        ) # 어떤 Pydantic 문서 모델을 사용할 것인지 Beanie에 등록록
        print("데이터베이스 연결 성공")
    except Exception as e:
        print(f"데이터베이스 연결 실패: {e}")


class Database:
    def __init__(self, model: Document): # MongoDB 문서 모델의 기본 클래스 상속
        self.model = model # PlanModle 클래스 내부에 저장장

    async def save(self, document: Document) -> None:
        await document.create()
        return

    async def get_all(self) -> list:

        docs = await self.model.find_all().to_list() # 모든 문서를 비동기적으로 가져와서 리스트로 반환환
        return docs

    async def delete(self, id: int):
        doc = await self.model.get(id)
        await doc.delete()

    async def get(self, id: int):
        doc = await self.model.get(id)
        return doc

    async def update(self, id: int, body: PlanUpdate):
        """해당 id의 문서를 찾아서 None이 아닌 필드만 선택해 부분 업데이트"""
        doc = await self.model.get(id)
        body = body.model_dump() # 딕셔너리로 변환환
        body = {"$set": {k: v for k, v in body.items() if v is not None}}
        await doc.update(body)
