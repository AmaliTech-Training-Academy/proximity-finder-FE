import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})
export class ChangePasswordComponent implements OnInit{
  changePasswordForm!: FormGroup;

  constructor (private fb: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(12)]],
      newPassword: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', Validators.required]
    }, {validators: [this.passwordMatchValidator, this.passwordMismatchValidator]})
  }

  // check if new password match confirm password
  passwordMatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : {'mismatch': true}
  }

  // ensure old password doesn't match new password
  passwordMismatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('oldPassword')?.value === form.get('newPassword')?.value ? {'mismatch': true} : null
  }

  // submit data
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const {oldPassword, newPassword, confirmPassword} = this.changePasswordForm.value

      console.log(oldPassword, newPassword, confirmPassword)
      this.changePasswordForm.reset()
    }
  }
}
