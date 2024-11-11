import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputFieldComponent } from '../input-field/input-field.component';

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

   constructor(private fb: FormBuilder) {}
     
   onSubmit() {
     // Send password reset email to provided email address
     console.log(this.resetForm.value);
   }

   
}
