import { Component } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [FieldsComponent,DropdownModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl:'./payment-method.component.html',
  styleUrl: './payment-method.component.sass'
})
export class PaymentMethodComponent {
  paymentMethod =[
    {name: 'Mobile Money'},
    {name: 'Bank Account'},
    {name: 'Paypal Account'},
  ]

    selectedPaymentMethod= this.paymentMethod[1];

    paymentForm = this.fb.group({
      paymentPreference: ['',Validators.required],
      bankName: ['',Validators.required],
      paymentMethod: ['',Validators.required],
      accountName: ['',Validators.required],
      accountNumber: ['',Validators.required, Validators.minLength(13)],
      accountAlias: ['',Validators.required],
      serviceProvider: ['',Validators.required],
      phoneNumber: ['',Validators.required,Validators.pattern(/^\+?[1-9]\d{1,14}$/),Validators.minLength(10), Validators.maxLength(15)],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required,Validators.email],
    });


  constructor(private router:Router, private fb: FormBuilder){}


  navigateTo(){
    this.router.navigateByUrl('/registration/about-business');
  }

}
