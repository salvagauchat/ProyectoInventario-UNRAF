import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'products-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  public productos:Producto[]=[];
  public messages: Message[] =[]
  constructor(
    private productosService: ProductosService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listadoProductos();
    this.messages = [{ severity: 'info', detail: 'Message Content' }];
  }

  //Funcion que trae el listado de productos, consultado el Services que se encarga de llamar al BackEnd.
  listadoProductos(){
    this.productosService.listProductos().subscribe((res:Producto[])=>{
      this.productos = res;
      console.log(res);
    });
  }

  editarProducto(id: string) {
    this.router.navigate([`/editar/${id}`]);
  }

  confirm2(event: Event, productoId: string) {

    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Seguro que quieres borrar este producto?',
        header: 'Confirmación de Eliminación',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "none",
        rejectIcon: "none",
        accept: () => {
            this.productosService.borrarProductos(productoId).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Producto borrado correctamente' });
                    // Llamar a listProductos para refrescar la lista después de eliminar
                    this.listadoProductos();
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto' });
                    console.error(err);
                }
            });
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Eliminación cancelada' });
        }
    });
}

}
