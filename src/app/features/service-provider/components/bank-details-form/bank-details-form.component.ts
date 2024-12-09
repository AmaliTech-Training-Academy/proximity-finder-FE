import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Observable, Subscription } from 'rxjs';
import { BankName } from '../../../profile-management/models/bank-name';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-bank-details-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './bank-details-form.component.html',
  styleUrl: './bank-details-form.component.sass',
})
export class BankDetailsFormComponent implements OnInit, OnDestroy {
  banks: BankName[] = [];
  bankSubscription!: Subscription;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private bankService: UserBankService) {}

  ngOnInit() {
    this.bankSubscription = this.bankService.getAllBanks().subscribe({
      next: (banks) => (this.banks = banks),
      error: (error) => console.error('Failed to fetch banks', error),
    });
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe();
  }
}
