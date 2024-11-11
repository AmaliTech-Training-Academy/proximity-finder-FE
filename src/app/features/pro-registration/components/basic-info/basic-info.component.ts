import { Component } from '@angular/core';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { FieldsComponent } from "../fields/fields.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [ProfileUpdateComponent, FieldsComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.sass'
})
export class BasicInfoComponent {
  registrationForm:FormGroup = this.formBuilder.group({
    businessOwnerName:['', Validators.required],
    phoneNumber:['', Validators.required],
    businessAddress:['', Validators.required],
    businessEmail:['', Validators.required, Validators.email],
    businessName:['', Validators.required],

  })

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(){
    if(this.registrationForm.valid){
      console.log('Form submitted:', this.registrationForm.value);
    }else
    {
      console.log('Form is invalid');
    }
  }

}
