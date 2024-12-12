import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MobileMoneyFormComponent } from '../mobile-money-form/mobile-money-form.component';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';
import { linkedAccounts } from '../../data';
import { BankDetailsComponent } from '../../../profile-management/components/bank-details/bank-details.component';
import { MobileMoneyDetailsComponent } from '../../../profile-management/components/mobile-money-details/mobile-money-details.component';
import { Observable, Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentService } from '../../../pro-registration/services/payment/payment.service';
import { paymentPreference } from '../../../pro-registration/models/payment';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { IPaymentAccount } from '../../../../core/models/payment-account';
import { AsyncPipe } from '@angular/common';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

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
    FormsModule,
    MatTabsModule,
    AsyncPipe,
  ],
  templateUrl: './pro-account-info.component.html',
  styleUrl: './pro-account-info.component.sass',
})
export class ProAccountInfoComponent implements OnInit, OnDestroy {
  isDialogVisible: boolean = false;
  isConfirmDialogVisible: boolean = false;
  paymentPreferences: paymentPreference[] = [];
  selectedPaymentPreference: string | undefined;
  defaultPaymentPreference: string | undefined;
  subscription!: Subscription;
  paymentMethod!: IPaymentAccount;
  linkedAccounts$: Observable<IPaymentAccount[]> =
    this.profileService.paymentAccounts$;
  selectedAccount: IPaymentAccount | undefined;

  @ViewChild('menu') menu!: Menu;

  items = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => (this.isDialogVisible = true),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        this.isConfirmDialogVisible = true;
      },
    },
  ];

  constructor(
    private paymentService: PaymentService,
    private profileService: ProfileService,
    private bankService: UserBankService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.profileService.getPaymentAccounts();

    this.subscription = this.paymentService.getAllPrefernces().subscribe({
      next: (preferences) => {
        this.paymentPreferences = preferences;
        if (this.paymentPreferences && this.paymentPreferences.length > 0) {
          this.defaultPaymentPreference =
            this.paymentPreferences[0].paymentPreference;
          this.selectedPaymentPreference =
            this.paymentPreferences[0].paymentPreference;
          console.log(this.defaultPaymentPreference);
        }
      },
      error: (error) =>
        console.log('Failed to fetch payment preferences', error),
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

  openAccountOptions(event: any, account: IPaymentAccount) {
    this.selectedAccount = account;
    this.menu.toggle(event);
  }

  deleteAccount() {
    console.log(this.selectedAccount?.id);
    this.bankService
      .deleteBankAccount(this.selectedAccount?.id as number)
      .subscribe({
        next: () => {
          this.notyf.success('Account delete successfully');
          this.profileService.getPaymentAccounts();

          this.isConfirmDialogVisible = false;
        },
        error: () => {
          this.notyf.error('Could not delete account');
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
