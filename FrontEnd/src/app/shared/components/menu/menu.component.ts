import { Component, OnInit } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public items: MenuItem[] | undefined = [];

  ngOnInit() {
    this.items = [
      { label: 'Productos',
        icon: PrimeIcons.TABLE,
        routerLink: ' '
      },
      { label: 'Agregar Producto',
        icon: PrimeIcons.PLUS,
        routerLink: 'crear'
      },
      { label: 'Info. Web',
        icon: PrimeIcons.INFO_CIRCLE,
        routerLink: 'informacion'
      },
    ];
  }
}
