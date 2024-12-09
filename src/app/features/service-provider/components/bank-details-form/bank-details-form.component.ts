import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Subscription } from 'rxjs';
import { BankName } from '../../../profile-management/models/bank-name';

@Component({
  selector: 'app-bank-details-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './bank-details-form.component.html',
  styleUrl: './bank-details-form.component.sass',
})
export class BankDetailsFormComponent implements OnInit, OnDestroy {
  banks: BankName[] = [];
  bankSubscription!: Subscription;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  bankDetailsForm: FormGroup = this.fb.group({
    bankName: ['', Validators.required],
    accountName: ['', Validators.required],
    accountAlias: ['', Validators.required],
    accountNumber: ['', Validators.required],
  });

  constructor(private bankService: UserBankService, private fb: FormBuilder) {}

  ngOnInit() {
    this.bankSubscription = this.bankService.getAllBanks().subscribe({
      next: (banks) => (this.banks = banks),
      error: (error) => console.error('Failed to fetch banks', error),
    });
  }

  onSubmit() {
    if (this.bankDetailsForm.valid) {
      console.log(this.bankDetailsForm.value);
    }
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe();
  }
}
