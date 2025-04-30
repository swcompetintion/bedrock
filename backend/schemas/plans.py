from pydantic import BaseModel
from backend.core.base import Plan


class PlanUpdate(Plan, BaseModel):
    pass
