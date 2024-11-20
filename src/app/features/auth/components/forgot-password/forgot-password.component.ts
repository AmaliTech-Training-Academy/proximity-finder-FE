import { CommonModule } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,InputFieldComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent {
   resetForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

   constructor(private fb: FormBuilder,private forgotPasswordService:ForgotPasswordService, @Inject(NOTYF) private notyf: Notyf) {}
     
   onSubmit() {
    if(this.resetForm.valid){
      const{ email} =this.resetForm.value

      this.forgotPasswordService.resetMail(email).subscribe({
        next: () => {
          this.notyf.success('Password Reset Mail Sent Successfully');
          this.resetForm.reset();
          
        },
        error: (error) => {
          this.notyf.error('Password Reset Failed. Please Try Again');
        }
      })
     
   }

   
}
}
