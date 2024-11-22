import { NOTYF } from './../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordValidator } from '../../../../utils/passwordValidator';
import { Router, RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider/provider.service';
import { Notyf } from 'notyf';
import { passwordMatchValidator } from '../../../../utils/passwordMatch';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-provider-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponent, RouterLink],
  templateUrl: './provider-input.component.html',
  styleUrls: ['./provider-input.component.sass']
})
export class ProviderInputComponent implements OnDestroy {
  signUpForm: FormGroup = this.formBuilder.group(
    {
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(12), passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator(),
    }
  );

 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private providerService: ProviderService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  private subscription: Subscription = new Subscription();
 

  onSubmit() {
    if (this.signUpForm.valid) {
      const { userName, email, password, confirmPassword } = this.signUpForm.value;
      const role = 'PROVIDER';

      const data = {
        userName,
        email,
        password,
        confirmPassword,
        role,
      };

      this.providerService.signupProvider(data).subscribe({
        next: (res) => {
          this.notyf.success('Registration Successful');
          setTimeout(() => {
            this.router.navigateByUrl('/registration');
          }, 1000); 
          this.signUpForm.reset();
        },
        error: (err) => {
          this.notyf.error('Registration Failed. Please try again');
        },
      });
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack() {
    this.router.navigateByUrl('/role-select');
  }
}
