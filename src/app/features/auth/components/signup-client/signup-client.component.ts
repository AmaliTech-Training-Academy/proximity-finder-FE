import { CommonModule } from '@angular/common';
import { Component, Inject} from '@angular/core';
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
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { passwordMatchValidator } from '../../../../utils/passwordMatch';

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
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
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
 

  constructor(private formBuilder: FormBuilder,private router:Router,private clientService:ClientService,@Inject(NOTYF) private notyf: Notyf) {}


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
      console.log(res);
       this.notyf.success('Registration successful');
       this.router.navigateByUrl('/login');
     });

    } 

  }

  goBack(){
    this.router.navigateByUrl('/role-select')
  }
}
