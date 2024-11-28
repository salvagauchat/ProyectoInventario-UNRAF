
from fastapi import APIRouter, FastAPI, HTTPException, status
from database.database import client
from schemas.productos import ProductosSchema
from models.productos import Producto
from bson import ObjectId 

db = client["Productos"]

app = FastAPI()
router = APIRouter(prefix="/productos",
                   responses={status.HTTP_404_NOT_FOUND: {"message":"No encontrado"}})

# Crear un producto
@router.post("/crear", response_model=Producto, status_code=status.HTTP_201_CREATED)
def crear_producto(producto: Producto):
    producto_dict = producto.dict()
    result = db["Productos"].insert_one(producto_dict)
    producto_dict["_id"] = str(result.inserted_id)  # Convertimos el ID a string para que sea serializable
    return producto_dict


# Obtener todos los productos usando el esquema
@router.get("/listado", status_code=status.HTTP_200_OK)
def listado_productos():
    productos = db["Productos"].find()
    return [
        {
            "_id": str(prod["_id"]),  # Convertimos el ObjectId a string
            "nombre": prod["nombre"],
            "precio": prod["precio"],
            "descripcion": prod["descripcion"],
            "disponible": prod["disponible"],
            "talle": prod["talle"],
            "marca": prod["marca"]
        }
        for prod in productos
    ]


# Obtener un producto por ID
@router.get("/buscarPorId/{id}", status_code=status.HTTP_200_OK)
def obtener_producto_por_id(id: str):
    producto = db["Productos"].find_one({"_id": ObjectId(id)})
    if not producto:
        # Devolvemos una excepción HTTP 404 si no se encuentra el producto
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    producto["_id"] = str(producto["_id"])
    return producto

# Actualizar un producto
@router.put("/editar/{id}", response_model=Producto, status_code=status.HTTP_200_OK)
def actualizar_producto(id: str, producto: Producto):
    db["Productos"].update_one({"_id": ObjectId(id)}, {"$set": producto.dict()})
    return obtener_producto_por_id(id)

# Eliminar un producto
@router.delete("/borrar/{id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_producto(id: str):
    db["Productos"].delete_one({"_id": ObjectId(id)})
    return {"message": "Producto eliminado"}


