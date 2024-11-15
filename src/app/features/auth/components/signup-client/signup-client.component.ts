import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordValidator } from '../../../../utils/passwordValidator';
import { Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-signup-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputFieldComponent,RouterLink],
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.sass',
})
export class SignupClientComponent {

  signUpForm: FormGroup = this.formBuilder.group(
    {
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required, Validators.pattern('^\\d{10}$') ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(12), passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.matchPassword,
    }
  );
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,private router:Router,private clientService:ClientService) {}

  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { mismatchedPassword: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
 
     const { userName, mobileNumber, email, password, confirmPassword } = this.signUpForm.value;
     const role ='seeker';
  

     const data ={
       userName,
       mobileNumber,
       email,
       password,
       confirmPassword,
       role
     }
     this.clientService.signupClient(data).subscribe((res) => {
       if(res.statusCode===201){
        
       }
       else{
         
       }
     });

    } 

  }

  goBack(){
    this.router.navigateByUrl('/role-select')
  }
}
