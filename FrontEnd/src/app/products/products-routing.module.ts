import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';

import { InformacionComponent } from './pages/informacion/informacion.component';
import { CrearPruductoComponent } from './pages/crear-pruducto/crear-pruducto.component';
import { EditarProductoComponent } from './pages/editar-pruducto/editar-pruducto.component';


const routes: Routes = [
  {
    path:'',
    component:ListadoComponent
  },
  {
    path:'crear',
    component:CrearPruductoComponent
  },
  {
    path: 'editar/:id',
    component:EditarProductoComponent
  },
  {
    path:'informacion',
    component:InformacionComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
