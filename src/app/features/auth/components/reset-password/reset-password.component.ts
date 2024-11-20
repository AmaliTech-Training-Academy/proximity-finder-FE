import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../../../utils/passwordValidator';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordMatchValidator } from '../../../../utils/passwordMatch';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,InputFieldComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.sass'
})
export class ResetPasswordComponent {
  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(12), passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator()
  });


  
  constructor(private fb: FormBuilder,private router:Router,private resetPasswordService:ResetPasswordService,@Inject(NOTYF) private notyf: Notyf,   private route: ActivatedRoute,) {}



  onSubmit() {

    if (this.passwordForm.valid) {
      const {password,confirmPassword} = this.passwordForm.value;
    
      this.route.queryParamMap.subscribe((params) => {
        const token = params.get('token'); 
        if(token){
        this.resetPasswordService.resetPassword(password,confirmPassword,token).subscribe({
          next: (response) => {
            console.log('Response:', response)
            this.notyf.success('Password Reset Successfully');
            this.passwordForm.reset();
            this.router.navigateByUrl('/login');
          },
  
          error: (error) => {
            console.log('Error:', error);
            this.notyf.error('Password Reset Failed. Please Try Again');
          }
        })
        
    
      } 
      });

  }

}

}
