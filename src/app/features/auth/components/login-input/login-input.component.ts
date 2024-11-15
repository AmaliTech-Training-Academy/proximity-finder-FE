import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,InputFieldComponent],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.sass'
})
export class LoginInputComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['',[ Validators.required, Validators.email]],
    password: ['',Validators.required]
  });

  constructor(private formBuilder:FormBuilder,private authService:AuthService) { }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value; 
      this.authService.login(data).subscribe((res) => {
        console.log('Login successful:', res);
      }, (error) => {
        console.error('Login failed:', error);
      });
    }
  }
  

}
