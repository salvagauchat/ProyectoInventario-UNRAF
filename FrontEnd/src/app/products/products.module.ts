import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrearPruductoComponent } from './pages/crear-pruducto/crear-pruducto.component';
import { EditarProductoComponent } from './pages/editar-pruducto/editar-pruducto.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ListadoComponent,
    CrearPruductoComponent,
    EditarProductoComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    ListadoComponent,
    CrearPruductoComponent,
    EditarProductoComponent,
    InformacionComponent
  ]
})
export class ProductsModule { }
