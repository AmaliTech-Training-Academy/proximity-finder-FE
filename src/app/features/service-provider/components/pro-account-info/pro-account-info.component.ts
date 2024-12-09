import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentService } from '../../../pro-registration/services/payment/payment.service';
import { paymentPreference } from '../../../pro-registration/models/payment';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { IPaymentAccount } from '../../../../core/models/payment-account';

@Component({
  selector: 'app-pro-account-info',
  standalone: true,
  imports: [
    ButtonModule,
    MenuModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    MobileMoneyFormComponent,
    BankDetailsFormComponent,
    MatTabsModule,
  ],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent implements OnInit, OnDestroy {
  isDialogVisible: boolean = false;
  isConfirmDialogVisible: boolean = false;
  paymentPreferences: paymentPreference[] = [];
  selectedPaymentPreference = 'Bank Account';
  subscription!: Subscription;
  paymentMethod!: IPaymentAccount;

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

  linkedAccounts!: IPaymentAccount[];

  constructor(
    private paymentService: PaymentService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.subscription = this.paymentService.getAllPrefernces().subscribe({
      next: (preferences) => (this.paymentPreferences = preferences),
      error: (error) =>
        console.log('Failed to fetch payment preferences', error),
    });
    this.subscription = this.profileService.getPaymentAccounts().subscribe({
      next: (preferences) => {
        this.linkedAccounts = preferences;
        // console.log(preferences);
      },
    });
  }

  setPreferredAccount(event: any) {
    this.selectedPaymentPreference = event.value.paymentPreference;
  }

  showDialog() {
    this.isDialogVisible = true;
  }

  closeModal(notVisible: boolean) {
    this.isDialogVisible = notVisible;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
