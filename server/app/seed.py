from sqlmodel import Session, select
from .database import engine, create_db_and_tables
from .models import Product

def run():
    create_db_and_tables()
    with Session(engine) as session:
        existing = session.exec(select(Product)).first()
        if existing:
            print("Productos ya existen, se omite seed.")
            return
        items = [
            {"title": "Vainilla", "description": "Helado clásico de vainilla", "price": 2.5, "image": "/static/images/vanilla.png"},
            {"title": "Chocolate", "description": "Helado de chocolate premium", "price": 3.0, "image": "/static/images/choco.png"},
            {"title": "Fresa", "description": "Helado de fresa natural", "price": 2.8, "image": "/static/images/straw.png"},
            {"title": "Menta con chispas", "description": "Refrescante menta con trozos de chocolate", "price": 3.2, "image": "/static/images/mint.png"},
        ]
        for it in items:
            p = Product(**it)
            session.add(p)
        session.commit()
        print("Seed completado: productos añadidos.")

if __name__ == "__main__":
    run()