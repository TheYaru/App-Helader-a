📘 K’Delight – README Oficial

Bienvenido al proyecto K’Delight, una aplicación móvil creada con React Native (Expo + Expo Router) y un backend hecho con FastAPI + SQLModel.
Este documento explica cómo instalar, configurar y ejecutar tanto el frontend como el backend, paso a paso.

⚙️ 1. Requisitos previos

Asegúrate de tener instalado:

🖥 Backend

Python 3.10+

pip

Virtualenv (opcional pero recomendado)

📱 Frontend

Node.js 18+

npm o pnpm

Expo CLI

EAS CLI (si quieres generar APK)

📁 2. Estructura del proyecto
KDELIGHT/
 ├── server/                 # Backend FastAPI
 │   ├── app/
 │   │    ├── main.py
 │   │    ├── crud.py
 │   │    ├── models.py
 │   │    ├── database.py
 │   │    ├── static/
 │   └── venv/ (opcional)
 │
 └── kdelight/               # Frontend Expo
      ├── app/
      ├── components/
      ├── constants/
      ├── assets/
      ├── package.json
      └── app.json

🚀 3. Cómo correr el Backend (FastAPI)
📌 1. Entrar a la carpeta del backend
cd server

📌 2. Crear entorno virtual
python -m venv venv

📌 3. Activarlo

Windows:

venv\Scripts\activate


Mac/Linux:

source venv/bin/activate

📌 4. Instalar dependencias
pip install -r requirements.txt


(si no tienes el archivo, entonces instalar manualmente:)

pip install fastapi uvicorn sqlmodel pydantic[dotenv] python-multipart

📌 5. Correr el servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

🔥 El backend estará disponible en:
http://TU-IP-LOCAL:8000

📱 4. Cómo correr el Frontend (Expo + React Native)
📌 1. Entrar a la carpeta
cd kdelight

📌 2. Instalar dependencias
npm install


(O si usas pnpm:)

pnpm install

📌 3. Iniciar Expo
npm run start


Esto abrirá Expo DevTools en tu navegador.

📌 4. Ejecutar en un dispositivo físico

Instalar Expo Go desde Play Store

Escanear el QR que aparece en la terminal o en la web

🏗 5. Generar un APK

Asegúrate de haber iniciado sesión:

eas login

📌 1. Configurar EAS
eas build:configure

📌 2. Crear APK
eas build --platform android --profile preview


Al finalizar, EAS te dará un link para descargar tu APK.

🔧 6. Configuración importante
📌 En constants/api.js

Debes colocar tu IP local:

export const API_BASE = "http://TU-IP-LOCAL:8000";


Ejemplo:

export const API_BASE = "http://192.168.0.64:8000";

📌 Recuerda:

✔ El backend debe estar corriendo
✔ Tu celular debe estar en la misma red WiFi que tu PC
✔ No uses localhost — Expo NO puede verlo

🧪 7. Endpoints principales (Backend)
Productos
GET    /products
GET    /products/{id}
POST   /products

Órdenes
POST   /orders
GET    /orders

Autenticación
POST   /register
POST   /login

📝 8. Scripts útiles
Frontend
npm run start     # levantar Expo
npm run android   # abrir en emulador Android

Backend
uvicorn app.main:app --reload
