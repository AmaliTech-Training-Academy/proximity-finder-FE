import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BankDetailsComponent } from '../../components/bank-details/bank-details.component';
import { MobileMoneyDetailsComponent } from '../../components/mobile-money-details/mobile-money-details.component';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [MatTabsModule, BankDetailsComponent, MobileMoneyDetailsComponent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.sass',
})
export class AccountDetailsComponent {}
