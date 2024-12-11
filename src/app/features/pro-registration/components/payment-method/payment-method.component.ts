import { BankPayment, MobilePayment, paymentPreference, PayPalPayment } from './../../models/payment';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bank, Payment, serviceProviders } from '../../models/payment';
import { PaymentService } from '../../services/payment/payment.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FieldsComponent, DropdownModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.sass'
})
export class PaymentMethodComponent implements OnInit,OnDestroy {
  banks: string[] = [];
  serviceProviders: serviceProviders[] = [];
  allPreferences:string[] =[]

  selectedPaymentMethod!: string;

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
    accountNumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
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

  bankSubscription!:Subscription
  mobileMoneySubscription!:Subscription
  payPalSubscription!:Subscription



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
      this.allPreferences =preferences.map(pref => pref.paymentPreference)

      this.selectedPaymentMethod = this.allPreferences[0]; 
    });

    this.paymentService.getAllBanks().subscribe((banks) => {
      this.banks = banks.map(bank => bank.bankName)
    });

    this.paymentService.getAllProviders().subscribe((providers) => {
      this.serviceProviders = providers;
    });
  }
  onSubmit(): void {
    if (this.payPalForm.valid) {
      const formData: PayPalPayment = {
        paymentPreference: this.payPalForm.value.paymentPreference as string,
        firstName: this.payPalForm.value.firstName as string,
        lastName: this.payPalForm.value.lastName as string,
        email: this.payPalForm.value.email as string,
      };

      this.payPalSubscription = this.paymentService.sendPaymentDetails(formData).subscribe({
        next: () => {
          this.notyf.success('PayPal payment method submitted successfully!');
          this.router.navigateByUrl('/registration/service-preference');
        },
        error: (error) => {      
        this.notyf.error('Failed to submit PayPal payment method.');
        }
      });
      
    } else if (this.bankForm.valid) {
      const formData: BankPayment = {
        paymentPreference: this.bankForm.value.paymentPreference as string,
        bankName: this.bankForm.value.bankName as string,
        accountName: this.bankForm.value.accountName as string,
        accountNumber: Number(this.bankForm.value.accountNumber),  
        accountAlias: this.bankForm.value.accountAlias as string,
      };
   
  
      this.bankSubscription = this.paymentService.sendPaymentDetails(formData).subscribe({
        next: () => {
          this.notyf.success('Bank payment method submitted successfully!');
          this.router.navigateByUrl('/registration/service-preference');
        },
        error: (error) => {
         this.notyf.error('Failed to submit bank payment method.');
        },
      });
      
    } else if (this.mobileForm.valid) {
      const formData: MobilePayment = {
        paymentPreference: this.mobileForm.value.paymentPreference as string,
        serviceProvider: this.mobileForm.value.serviceProvider as string,
        accountName: this.mobileForm.value.accountName as string,
        accountAlias: this.mobileForm.value.accountAlias as string,
        phoneNumber: Number(this.mobileForm.value.phoneNumber), 
      };
  
      this.mobileMoneySubscription = this.paymentService.sendPaymentDetails(formData).subscribe({
        next: () => {
          this.notyf.success('Mobile payment method submitted successfully!');
          this.router.navigateByUrl('/registration/service-preference');
        },
        error: (error) => {
          this.notyf.error('Failed to submit mobile payment method.');
        },

      });
      
    } else {
      this.notyf.error('Please fill in the required fields for the selected payment method.');
    }
  }
  
  

  navigateTo(): void {
    this.router.navigateByUrl('/registration/about-business');
  }

  ngOnDestroy(): void {
    if (this.payPalSubscription) {
      this.payPalSubscription.unsubscribe();
    }
    if (this.bankSubscription) {
      this.bankSubscription.unsubscribe();
    }
    if (this.mobileMoneySubscription) {
      this.mobileMoneySubscription.unsubscribe();
    }
  }
  
}
