import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputFieldComponent],
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.sass']
})
export class LoginInputComponent implements OnDestroy {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  private subscription: Subscription = new Subscription();

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
          this.notyf.success('Login Successful');
            if (res.roles[0] === 'ROLE_ADMIN') {
              console.log('Admin')
              this.router.navigateByUrl('admin/dashboard');
            } else if (res.roles[0] === 'ROLE_SEEKER') {
              console.log('seeker')
              this.router.navigateByUrl('');
            } else if (res.roles[0] === 'ROLE_PROVIDER') {
              this.router.navigateByUrl('/registration');
            } 
            this.loginForm.reset();
        },
        error: () => {
          this.notyf.error('Login failed. Please check your credentials.');
        }
      });
    }
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
