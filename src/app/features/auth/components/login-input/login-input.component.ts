import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputFieldComponent],
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.sass']
})
export class LoginInputComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; 
      this.authService.login(email, password).subscribe({
        next: (res) => {
          switch(res.role) {
            case 'ADMIN':
              this.notyf.success('Login Successful');
              this.router.navigateByUrl('/admin/dashboard');
              break;
            case 'SEEKER':
              this.notyf.success('Login Successful');
              this.router.navigateByUrl('');
              break;
            case 'PROVIDER':
              this.notyf.success('Login Successful');
              this.router.navigateByUrl('provider/dashboard');
              break;
            default:
              this.router.navigateByUrl('');
          }
          this.loginForm.reset();
        },
        error: (error) => {
          this.notyf.error('Login failed. Please check your credentials.');
          
        }
      });
    }
  }
}
