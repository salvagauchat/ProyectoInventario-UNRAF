import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-pruducto',
  templateUrl: './crear-pruducto.component.html',
  styleUrls: ['./crear-pruducto.component.css'],
})
export class CrearPruductoComponent implements OnInit {
  public productoForm!: FormGroup;
  public carrito: any[] = []; // Lista de productos en el carrito

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Crear el formulario
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      disponible: [true],
      talle: ['', Validators.required],
      marca: ['', Validators.required],
    });

    // Cargar productos desde localStorage
    this.loadCarrito();
  }

  // Cargar carrito desde localStorage
  loadCarrito() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  // Método para agregar el producto al carrito
  agregarProducto() {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;

      // Agregar el nuevo producto al carrito
      this.carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      // Mostrar mensaje de confirmación
      this.messageService.add({
        severity: 'success',
        summary: 'Producto Agregado',
        detail: 'Producto agregado momentáneamente al carrito.',
      });

      // Limpiar el formulario
      this.productoForm.reset();
      this.productoForm.patchValue({ disponible: true }); // Reiniciar el campo booleano
    } else {
      // Mostrar mensaje de error si el formulario no es válido
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos obligatorios.',
      });
    }
  }

  // Método para crear un producto en el backend
  crearProducto(producto: Producto, index: number) {
    this.productosService.crearProductos(producto).subscribe(
      (response) => {
        // Eliminar el producto del carrito una vez creado
        this.carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));

        this.messageService.add({
          severity: 'success',
          summary: 'Producto Creado',
          detail: `El producto ${producto.nombre} fue creado correctamente.`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `No se pudo crear el producto ${producto.nombre}.`,
        });
      }
    );
  }

  eliminarProducto(producto: any): void {
    // Eliminar el producto del array carrito
    this.carrito = this.carrito.filter((item) => item !== producto);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    // Mostrar mensaje de confirmación
    this.messageService.add({
      severity: 'warn',
      summary: 'Producto Eliminado',
      detail: `Se eliminó ${producto.nombre} del carrito.`
    });
  }


  isValidField(field: string): boolean | null {
    const control = this.productoForm.controls[field];

    if (control) {
      if (control.value && control.value.name === '') {
        return true;
      }
      return control.errors && control.touched;
    } else {
      return null;
    }
  }


}






