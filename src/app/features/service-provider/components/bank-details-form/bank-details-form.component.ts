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
import { ButtonModule } from 'primeng/button';
import { UserBankService } from '../../../profile-management/services/user-bank.service';
import { Subscription } from 'rxjs';
import { BankName } from '../../../profile-management/models/bank-name';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

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

  constructor(
    private bankService: UserBankService,
    private fb: FormBuilder,
    private router: Router,
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
            this.router.navigate(['/provider/dashboard/settings']);
          },
          error: (error) => {
            this.notyf.error('Failed to add account');
          },
        });
    }
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe();
  }
}