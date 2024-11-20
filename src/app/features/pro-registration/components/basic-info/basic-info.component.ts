import { Component } from '@angular/core';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { FieldsComponent } from "../fields/fields.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [ProfileUpdateComponent, FieldsComponent,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.sass'
})
export class BasicInfoComponent {
  registrationForm:FormGroup = this.formBuilder.group({
    businessOwnerName:['', Validators.required],
    phoneNumber:['', Validators.required,Validators.pattern('^\\+?[1-9]\\d{1,14}(?:[\\s\\-]\\d{1,4})*$')],
    businessAddress:['', Validators.required],
    businessEmail:['', Validators.required, Validators.email],
    businessName:['', Validators.required],

  })

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(){
    if(this.registrationForm.valid){
    
    }
  }


}
