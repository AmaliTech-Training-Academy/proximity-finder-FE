import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass'
})
export class ResetPasswordComponent {
  passwordForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(12), this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.matchPassword
    });
  }
  passwordValidator(control: any) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatchedPassword: true };
    }
    return null;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Form submitted:', this.passwordForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
