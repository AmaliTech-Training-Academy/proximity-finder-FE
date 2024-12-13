import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaypalService } from '../../services/paypal.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paypal-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, CommonModule],
  templateUrl: './paypal-form.component.html',
  styleUrl: './paypal-form.component.sass',
})
export class PaypalFormComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();

  paypalForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private paypalService: PaypalService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  onSubmit() {
    if (this.paypalForm.valid) {
      const formvalue = this.paypalForm.value;

      const formData = {
        paymentPreference: 'PayPal',
        ...formvalue,
      };

      this.paypalService.addPaypal(formData).subscribe({
        next: () => this.notyf.success('Account added successfully'),
        error: () => this.notyf.error('Failed to add account'),
      });
    } else {
      this.paypalForm.markAllAsTouched();
    }
  }
}
