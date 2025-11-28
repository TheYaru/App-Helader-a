from typing import List, Optional
from sqlmodel import select, Session
from .models import Product, Order, User
import json

def get_products(session: Session) -> List[Product]:
    return session.exec(select(Product)).all()

def get_product(session: Session, product_id: int) -> Optional[Product]:
    return session.get(Product, product_id)

def create_product(session: Session, product_data: dict) -> Product:
    p = Product(**product_data)
    session.add(p)
    session.commit()
    session.refresh(p)
    return p

def create_order(session: Session, items: list, total: float) -> Order:
    o = Order(items_json=json.dumps(items), total=total)
    session.add(o)
    session.commit()
    session.refresh(o)
    return o

def get_orders(session: Session) -> List[Order]:
    return session.exec(select(Order).order_by(Order.created_at.desc())).all()

def create_user(session: Session, user_data: dict) -> User:
    user = User(**user_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_by_email(session: Session, email: str) -> Optional[User]:
    return session.exec(select(User).where(User.email == email)).first()