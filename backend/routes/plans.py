from fastapi import APIRouter
from backend.models.plans import PlanModel
from backend.schemas.plans import PlanUpdate
from backend.database.connection import Database
from backend.utils.logger import logger
plan_router = APIRouter(
    prefix="/plans",
    tags=["plans"]
)
plan_db = Database(PlanModel)


@plan_router.get("/", response_model=list[PlanModel])
async def get_all_plans():
    logger.info("Fetching all plans")
    plans = await plan_db.get_all()
    return plans


@plan_router.get("/{id}")
async def get_plan(id: int):
    plan = await plan_db.get(id)
    return plan


@plan_router.post("/")
async def create_plan(plan: PlanModel):
    await plan_db.save(plan)
    return {"message": "plan created successfully"}


@plan_router.delete("/{id}")
async def delete_plan(id: int):
    await plan_db.delete(id)
    return {"message": "plan deleted successfully"}


@plan_router.put("/{id}")
async def update_plan(id: int, plan: PlanUpdate):
    await plan_db.update(id, plan)
    return {"message": "plan updated successfully"}
