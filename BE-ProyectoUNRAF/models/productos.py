from pydantic import BaseModel
from typing import Optional

class Producto(BaseModel):
    nombre: str
    precio: int
    descripcion: str
    disponible: bool = True
    talle: str
    marca: str