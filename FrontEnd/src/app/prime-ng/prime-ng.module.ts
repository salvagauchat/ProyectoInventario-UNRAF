import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';


//Este es el modulo central de PrimeNG para importar todos los componentes utilizados en la app. Luego se importa este modulo en el modulo de Productos.

@NgModule({
  exports:[
    MenuModule,
    ButtonModule,
    MenubarModule,
    DividerModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    FloatLabelModule,
    ListboxModule,
    CheckboxModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PrimeNgModule { }
