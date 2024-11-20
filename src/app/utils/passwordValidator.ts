import {  ValidationErrors, FormGroup } from '@angular/forms';

export function passwordValidator(control: any) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  return passwordRegex.test(control.value) ? null : { invalidPassword: true };
}


export class FormValidators {
  static passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  static passwordMismatchValidator(form: FormGroup): ValidationErrors | null {
    return form.get('oldPassword')?.value === form.get('newPassword')?.value
      ? { mismatch: true }
      : null;
  }
}
