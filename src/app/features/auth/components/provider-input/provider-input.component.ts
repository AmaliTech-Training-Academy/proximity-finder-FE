import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordValidator } from '../../../../utils/passwordValidator';

@Component({
  selector: 'app-provider-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputFieldComponent],
  templateUrl: './provider-input.component.html',
  styleUrl: './provider-input.component.sass'
})
export class ProviderInputComponent {
  signUpForm: FormGroup = this.formBuilder.group({
    businessName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12), passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.matchPassword
  });
 

  constructor(private formBuilder: FormBuilder) {}


  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatchedPassword: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form submitted:', this.signUpForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
