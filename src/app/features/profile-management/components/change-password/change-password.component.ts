import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from "../password-input/password-input.component";
import { FormValidators, passwordValidator } from '../../../../utils/passwordValidator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})
export class ChangePasswordComponent{
  changePasswordForm = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(12)]],
    newPassword: ['', [Validators.required, Validators.minLength(12)]],
    confirmPassword: ['', Validators.required]
  }, {validators: [FormValidators.passwordMatchValidator, FormValidators.passwordMismatchValidator, passwordValidator]})

  constructor (private fb: FormBuilder) {}

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const {oldPassword, newPassword, confirmPassword} = this.changePasswordForm.value

      this.changePasswordForm.reset()
    }
  }
}
