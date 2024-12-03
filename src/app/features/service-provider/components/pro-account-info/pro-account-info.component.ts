import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-pro-account-info',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent {
  items = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
    },
  ];

  linkedAccounts = [
    {
      name: 'American Express',
    },
    {
      name: 'Fidelity Bank - EUR',
    },
    {
      name: 'MTN Mobile Money',
    },
    {
      name: 'Stanbic Bank',
    },
  ];
}
