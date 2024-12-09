import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MobileMoneyFormComponent } from '../mobile-money-form/mobile-money-form.component';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';
import { linkedAccounts } from '../../data';
import { BankDetailsComponent } from '../../../profile-management/components/bank-details/bank-details.component';
import { MobileMoneyDetailsComponent } from '../../../profile-management/components/mobile-money-details/mobile-money-details.component';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Subscription } from 'rxjs';

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
    MatTabsModule,
  ],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent implements OnInit {
  isDialogVisible: boolean = false;
  isConfirmDialogVisible: boolean = false;
  bankSubscription!: Subscription;
  allBankNames: string[] = [];

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

  constructor(private bankService: UserBankService) {}

  ngOnInit() {
    this.bankSubscription = this.bankService.getAllBanks().subscribe({
      next: (banks) => console.log(banks),
      error: (error) => console.error('Failed to fetch banks', error),
    });
  }

  showDialog() {
    this.isDialogVisible = true;
  }

  closeModal(notVisible: boolean) {
    this.isDialogVisible = notVisible;
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe();
  }
}
