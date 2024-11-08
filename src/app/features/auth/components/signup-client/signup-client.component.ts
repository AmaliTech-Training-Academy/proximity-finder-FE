import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordValidator } from '../../../../utils/passwordValidator';

@Component({
  selector: 'app-signup-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent],
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.sass',
})
export class SignupClientComponent {
  signUpForm: FormGroup = this.formBuilder.group(
    {
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(12), passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.matchPassword,
    }
  );
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

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
    console.log('Form submitted:', this.signUpForm.value);

    if (this.signUpForm.valid) {
      console.log('Form submitted:', this.signUpForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
