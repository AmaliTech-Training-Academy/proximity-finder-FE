import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from "../password-input/password-input.component";
import { FormValidators, passwordValidator } from '../../../../utils/passwordValidator';
import { ChangePasswordService } from '../../services/change-password.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})

export class ChangePasswordComponent implements OnDestroy{
  
  private notyf = inject(NOTYF)
  private subscription: Subscription = new Subscription()

  changePasswordForm = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(12)]],
    newPassword: ['', [Validators.required, Validators.minLength(12), passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, {validators: [FormValidators.passwordMatchValidator]})

  constructor (private fb: FormBuilder, private changePasswordService: ChangePasswordService) {}

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

      const body = {
        oldPassword: oldPassword ?? '',
        newPassword: newPassword ?? '',
        confirmPassword: confirmPassword ?? ''
      };
    
      this.subscription = this.changePasswordService.changePassword(body).subscribe({
        next: () => {
          this.notyf.success('Password changed successfully')
        },
        error: (err) => {
          console.error('Error changing password:', err)
          this.notyf.error('Error changing password')
        }
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  
}
