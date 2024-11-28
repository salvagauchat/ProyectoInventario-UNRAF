import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  })
export class ProductosService { //Este servicio se encarga de comunicar el front con el Backend creado en python.

  constructor( private http:HttpClient ) { }

  listProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`http://localhost:8000/productos/listado`);
  }

  crearProductos(producto: Producto) {
    return this.http.post(`http://localhost:8000/productos/crear`, producto);
  }

  editarProductos(id: string, producto: Producto) {
    return this.http.put(`http://localhost:8000/productos/editar/${id}`, producto);
  }

  borrarProductos(id: string) {
    return this.http.delete(`http://localhost:8000/productos/borrar/${id}`);
  }

  byIdProductos(id:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`http://localhost:8000/productos/buscarPorId/${id}`);
  }


}
