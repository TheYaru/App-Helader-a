from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
from contextlib import asynccontextmanager

from sqlmodel import Session

from .database import create_db_and_tables, get_session
from .models import Product, ProductCreate, OrderCreate, Order, User, UserCreate
from .crud import get_products, get_product, create_product, create_order, get_orders, create_user, get_user_by_email


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Se ejecuta al iniciar la app
    create_db_and_tables()
    yield


app = FastAPI(title="KDelight API", lifespan=lifespan)

# CORS para desarrollo: ajustar orígenes en producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir archivos estáticos 
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products", response_model=List[Product])
def api_get_products(session: Session = Depends(get_session)):
    return get_products(session)


@app.get("/products/{product_id}", response_model=Product)
def api_get_product(product_id: int, session: Session = Depends(get_session)):
    p = get_product(session, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p


@app.post("/products", response_model=Product)
def api_create_product(payload: ProductCreate, session: Session = Depends(get_session)):
    return create_product(session, payload.dict())

@app.post("/orders", response_model=Order)
def api_create_order(payload: OrderCreate, session: Session = Depends(get_session)):
    # Crear la orden y devolver el objeto completo
    return create_order(session, payload.items, payload.total)

@app.post("/register", response_model=User)
def register_user(payload: UserCreate, session: Session = Depends(get_session)):
    existing = get_user_by_email(session, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    new_user = create_user(session, payload.dict())
    return new_user

@app.post("/login")
def login(email: str = Body(), password: str = Body(), session: Session = Depends(get_session)):
    user = get_user_by_email(session, email)
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    return {"message": "Login exitoso", "user_id": user.id}
