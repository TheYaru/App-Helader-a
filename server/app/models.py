from typing import Optional, List
from sqlmodel import SQLModel, Field
import datetime
import json

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    price: float = 0.0
    image: Optional[str] = None

class ProductCreate(SQLModel):
    title: str
    description: Optional[str] = None
    price: float = 0.0
    image: Optional[str] = None

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    items_json: str  # JSON string of items [{product_id: int, qty: int}, ...]
    total: float
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

    def items(self) -> List[dict]:
        try:
            return json.loads(self.items_json)
        except Exception:
            return []

class OrderCreate(SQLModel):
    items: List[dict]
    total: float

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password: str  # luego podemos poner hash
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)


class UserCreate(SQLModel):
    name: str
    email: str
    password: str
