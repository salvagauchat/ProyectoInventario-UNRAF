import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-editar-pruducto',
  templateUrl: './editar-pruducto.component.html',
  styleUrls: ['./editar-pruducto.component.css']
})
export class EditarProductoComponent implements OnInit {
  public productoForm!: FormGroup;
  public productoId!: string;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      disponible: [true],
      talle: ['', Validators.required],
      marca: ['', Validators.required],
    });

    // Obtener el ID del producto de la ruta
    this.activatedRoute.params.subscribe((params) => {
      this.productoId = params['id'];
      this.loadProductoData(this.productoId); // Llamamos a la funcion que carga los datos.
    });
  }

  // Método para cargar los datos del producto en el formulario
  loadProductoData(id: string): void {
    this.productosService.byIdProductos(id).subscribe(
      (producto) => {
        this.productoForm.patchValue(producto); //Carga el formulario con los datos del producto buscado.
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el producto.',
        });
      }
    );
  }

  // Método para editar el producto
  editarProducto(): void {
    if (this.productoForm.valid) {
      const productoEditado: Producto = this.productoForm.value;

      this.productosService.editarProductos(this.productoId, productoEditado).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto Actualizado',
            detail: `El producto ${productoEditado.nombre} fue actualizado correctamente.`,
          });

          this.router.navigate(['/']);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el producto.',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor completa todos los campos requeridos.',
      });
    }
  }

  isValidField(field: string): boolean | null {
    const control = this.productoForm.controls[field];
    return control ? control.errors && control.touched : null;
  }
}
