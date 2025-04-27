from fastapi import APIRouter
from backend.models.plans import Plan, PlanUpdate
from backend.database.connection import Database
plan_router = APIRouter(
    prefix="/plans",
    tags=["plans"]
)
plan_db = Database(Plan)


@plan_router.get("/", response_model=list[Plan])
async def get_all_plans():
    plans = await plan_db.get_all()
    return plans


@plan_router.get("/{id}")
async def get_plan(id: int):
    plan = await plan_db.get(id)
    return plan


@plan_router.post("/")
async def create_plan(plan: Plan):
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
