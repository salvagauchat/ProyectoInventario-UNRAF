# Schema para un solo producto
def ProductoSchema(producto) -> dict:
    return {
        "id": str(producto["_id"]),
        "nombre": producto["nombre"],
        "precio": int(producto["precio"]),  # Convertimos el precio a entero si es necesario
        "descripcion": producto["descripcion"],
        "disponible": producto["disponible"],
        "talle": producto["talle"],
        "marca": producto["marca"]
    }

# Schema para una lista de productos
def ProductosSchema(productos) -> list:
    return [ProductoSchema(producto) for producto in productos]
