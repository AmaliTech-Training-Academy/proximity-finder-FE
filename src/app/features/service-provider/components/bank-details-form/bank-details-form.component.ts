import {
  Component,
  EventEmitter,
  Inject,
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
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Subscription } from 'rxjs';
import { BankName } from '../../../profile-management/models/bank-name';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CommonModule,
  ],
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
    accountAlias: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
    accountNumber: [
      null,
      [Validators.required, Validators.minLength(13), Validators.maxLength(13)],
    ],
  });

  constructor(
    private bankService: UserBankService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    this.bankSubscription = this.bankService.getAllBanks().subscribe({
      next: (banks) => (this.banks = banks),
      error: (error) => console.error('Failed to fetch banks', error),
    });
  }

  onSubmit() {
    if (this.bankDetailsForm.valid) {
      const bankData = this.bankDetailsForm.value;

      this.bankService
        .addBank({
          ...bankData,
          bankName: bankData.bankName.bankName,
          paymentPreference: 'Bank Account',
        })
        .subscribe({
          next: (response) => {
            this.notyf.success('Account added successfully');
            this.closeDialog();
            this.profileService.getPaymentAccounts();
          },
          error: (error) => {
            this.notyf.error('Failed to add account');
          },
        });
    } else {
      this.bankDetailsForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe();
  }
}
