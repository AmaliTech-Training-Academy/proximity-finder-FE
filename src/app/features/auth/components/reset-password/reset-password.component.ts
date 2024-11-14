import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordValidator } from '../../../../utils/passwordValidator';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,InputFieldComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass'
})
export class ResetPasswordComponent {
  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(12), passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.matchPassword
  });

  
  constructor(private fb: FormBuilder) {}
  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatchedPassword: true };
    }
    return null;
  }



  onSubmit() {
    if (this.passwordForm.valid) {
  
    } 
  }

}
