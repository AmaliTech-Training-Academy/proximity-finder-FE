import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { passwordValidator } from '../../../../utils/passwordValidator';
import { Router, RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider/provider.service';

@Component({
  selector: 'app-provider-input',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputFieldComponent,RouterLink],
  templateUrl: './provider-input.component.html',
  styleUrl: './provider-input.component.sass'
})
export class ProviderInputComponent {
  signUpForm: FormGroup = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12), passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: this.matchPassword
  });
 

  constructor(private formBuilder: FormBuilder, private router:Router,private providerService:ProviderService) {}


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
      const { userName, email, password,confirmPassword} = this.signUpForm.value;
      const role='PROVIDER'

      const data ={
        userName,
        email,
        password,
        confirmPassword,
        role
      }
      this.providerService.signupProvider(data).subscribe((res) =>{
        console.log('Yes you did it');

      })  
    } 
  }

  goBack(){
    this.router.navigateByUrl('/role-select')
  }


}
