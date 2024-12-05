import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MobileMoneyFormComponent } from '../mobile-money-form/mobile-money-form.component';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';
import { linkedAccounts } from '../../data';

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
  isConfirmDialogVisible: boolean = false;

  items = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => (this.isDialogVisible = true),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => (this.isConfirmDialogVisible = true),
    },
  ];

  linkedAccounts = linkedAccounts;

  showDialog() {
    this.isDialogVisible = true;
  }

  closeModal(notVisible: boolean) {
    this.isDialogVisible = notVisible;
  }
}
