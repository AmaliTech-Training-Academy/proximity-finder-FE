import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,InputFieldComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent implements OnDestroy {
   resetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

   constructor(private fb: FormBuilder,private forgotPasswordService:ForgotPasswordService, @Inject(NOTYF) private notyf: Notyf,private router:Router) {}
     

   private subscription: Subscription = new Subscription();
 
   onSubmit() {
    if (this.resetForm.valid) {
      const { email } = this.resetForm.value;
  
      this.forgotPasswordService.resetMail(email).subscribe({
        next: (response) => {
          this.notyf.success('Password Reset Mail Sent Successfully');
          this.resetForm.reset();
          this.router.navigateByUrl('/confirmation', {
            state: { email }, 
          });
          
        },
        error: (error) => {
          this.notyf.error('Password Reset Failed. Please Try Again');
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
