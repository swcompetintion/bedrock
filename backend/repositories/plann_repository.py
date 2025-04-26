from typing import List
from backend.models.plan import Plan


class PlanRepository:
    def __init__(self):
        self.plans = []  # 간단한 리스트로 데이터 저장

    def get(self, plan_id: int) -> Plan:
        return next((plan for plan in self.plans if plan.id == plan_id), None)

    def get_all(self) -> List[Plan]:
        return self.plans

    def add(self, plan: Plan) -> None:  # 'paln' -> 'plan'으로 수정
        self.plans.append(plan)

    def update(self, plan_id: int, plan: Plan) -> None:
        for idx, existing_plan in enumerate(self.plans):
            if existing_plan.id == plan_id:
                self.plans[idx] = plan  # 'palns' -> 'plans'으로 수정
                break

    def delete(self, plan_id: int) -> None:
        self.plans = [plan for plan in self.plans if plan.id != plan_id]
