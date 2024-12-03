import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MobileMoneyFormComponent } from '../mobile-money-form/mobile-money-form.component';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';

@Component({
  selector: 'app-pro-account-info',
  standalone: true,
  imports: [
    ButtonModule,
    MenuModule,
    DialogModule,
    TabViewModule,
    MobileMoneyFormComponent,
    BankDetailsFormComponent,
  ],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent {
  isDialogVisible: boolean = false;
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

  showDialog() {
    this.isDialogVisible = true;
  }

  closeModal(notVisible: boolean) {
    this.isDialogVisible = notVisible;
  }
}
