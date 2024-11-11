import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../../auth/components/input-field/input-field.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})
export class ChangePasswordComponent{
  changePasswordForm = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(12)]],
    newPassword: ['', [Validators.required, Validators.minLength(12)]],
    confirmPassword: ['', Validators.required]
  }, {validators: [this.passwordMatchValidator, this.passwordMismatchValidator]})

  oldPasswordVisible = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  constructor (private fb: FormBuilder) {}

  passwordMatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : {'mismatch': true}
  }

  passwordMismatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('oldPassword')?.value === form.get('newPassword')?.value ? {'mismatch': true} : null
  }

  togglePasswordVisibility(type: string): void {
    if (type === 'oldPassword') {
      this.oldPasswordVisible = !this.oldPasswordVisible
    }
    else if (type === 'newPassword') {
      this.newPasswordVisible = !this.newPasswordVisible
    }
    else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible
    }
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const {oldPassword, newPassword, confirmPassword} = this.changePasswordForm.value

      this.changePasswordForm.reset()
    }
  }
}
