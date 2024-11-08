import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.sass'
})
export class LoginInputComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['',Validators.required]
    });
  }

 
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
