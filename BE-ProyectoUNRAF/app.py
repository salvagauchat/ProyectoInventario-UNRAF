
from fastapi import FastAPI, HTTPException, status
from routes import productos
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from database.database import client

app = FastAPI()

#Configuración de CORS
origins = [
    'http://localhost:4200'
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Este es un endpoint para chequear que funciona el BackEnd.
@app.get('/health', status_code=200)
def test():
    return {'status':'OK'}


app.include_router(productos.router)