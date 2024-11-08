import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass'
})
export class ForgotPasswordComponent implements OnInit {
   resetForm!: FormGroup

   constructor(private fb: FormBuilder, private router:Router) {}
     
   

   ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
   }

   onSubmit() {
     // Send password reset email to provided email address
     console.log(this.resetForm.value);
   }

   backToLogin() {
     // Navigate back to login page
     this.router.navigate(['/login']);
   }
}
