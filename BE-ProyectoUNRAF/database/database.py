
from pymongo.mongo_client import MongoClient


uri = "mongodb+srv://administrador:admin1234@productos.t5ywe.mongodb.net/?retryWrites=true&w=majority&appName=Productos"

client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("La conexion con la db funca. You successfully connected to MongoDB!")
except Exception as e:
    print(e)