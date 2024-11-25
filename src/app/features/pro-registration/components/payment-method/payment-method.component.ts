import { BankPayment, MobilePayment, paymentPreference, PayPalPayment } from './../../models/payment';
import { Component, Inject, OnInit } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bank, Payment, serviceProviders } from '../../models/payment';
import { PaymentService } from '../../services/payment/payment.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FieldsComponent, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.sass'
})
export class PaymentMethodComponent implements OnInit {
  paymentMethod: paymentPreference[] = [];
  banks: Bank[] = [];
  serviceProviders: serviceProviders[] = [];

  selectedPaymentMethod: paymentPreference | undefined;

  payPalForm =this.fb.group({
    paymentPreference: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })

  bankForm = this.fb.group({
    paymentPreference: ['', Validators.required],
    bankName: ['', Validators.required],
    accountName: ['', Validators.required],
    accountNumber: ['', [Validators.required, Validators.minLength(13)]],
    accountAlias: ['', Validators.required],
  })

  mobileForm = this.fb.group({
    paymentPreference: ['', Validators.required],
    serviceProvider: ['', Validators.required],
    accountName: ['', Validators.required],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\+?[1-9]\d{1,14}$/),
        Validators.minLength(10),
        Validators.maxLength(15)
      ]
    ],
    accountAlias: ['', Validators.required],

  })



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    @Inject(NOTYF) private notyf: Notyf,
  ) {}

  ngOnInit(): void {
    this.loadPaymentData();
  }

  loadPaymentData(): void {
    this.paymentService.getAllPrefernces().subscribe((preferences) => {
      this.paymentMethod = preferences;

      this.selectedPaymentMethod = this.paymentMethod.find((pref) => pref.paymentPreference === 'Bank Account');
    });

    this.paymentService.getAllBanks().subscribe((banks) => {
      this.banks = banks;
    });

    this.paymentService.getAllProviders().subscribe((providers) => {
      this.serviceProviders = providers;
    });
  }
  onSubmit(): void {
    if (this.payPalForm.valid) {
      const formData = {
        paymentPreference: this.payPalForm.value.paymentPreference,
        firstName: this.payPalForm.value.firstName,
        lastName: this.payPalForm.value.lastName,
        email: this.payPalForm.value.email
      };
  
      this.paymentService.sendPaymentDetails(formData as PayPalPayment).subscribe(
        () => {
          this.notyf.success('PayPal payment method submitted successfully!');
          this.navigateTo();
        },
        (error) => {
          console.error('PayPal submission failed', error);
          this.notyf.error('Failed to submit PayPal payment method.');
        }
      );
    } else if (this.bankForm.valid) {
      console.log(this.bankForm.value)
      const formData = {
        paymentPreference: this.bankForm.value.paymentPreference,
        bankName: this.bankForm.value.bankName,
        accountName: this.bankForm.value.accountName,
        accountNumber: this.bankForm.value.accountNumber,
        accountAlias: this.bankForm.value.accountAlias
      };
  
      this.paymentService.sendPaymentDetails(formData as  BankPayment ).subscribe(
        () => {
          this.notyf.success('Bank payment method submitted successfully!');
          this.navigateTo();
        },
        (error) => {
          console.error('Bank submission failed', error);
          this.notyf.error('Failed to submit bank payment method.');
        }
      );
    } else if (this.mobileForm.valid) {
      const formData = {
        paymentPreference: this.mobileForm.value.paymentPreference,
        serviceProvider: this.mobileForm.value.serviceProvider,
        accountName: this.mobileForm.value.accountName,
        accountAlias: this.mobileForm.value.accountAlias,
        phoneNumber: Number(this.mobileForm.value.phoneNumber)
       
      };
  
      this.paymentService.sendPaymentDetails(formData as MobilePayment ).subscribe(
        () => {
          this.notyf.success('Mobile payment method submitted successfully!');
          this.navigateTo();
        },
        (error) => {
          console.error('Mobile submission failed', error);
          this.notyf.error('Failed to submit mobile payment method.');
        }
      );
    } else {
      this.notyf.error('Please fill in the required fields for the selected payment method.');
    }
  }
  

  navigateTo(): void {
    this.router.navigateByUrl('/registration/about-business');
  }
}
