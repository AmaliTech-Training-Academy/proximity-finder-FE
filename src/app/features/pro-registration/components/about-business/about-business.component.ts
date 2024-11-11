import { Component } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-business',
  standalone: true,
  imports: [FieldsComponent,RouterLink,ReactiveFormsModule],
  templateUrl: './about-business.component.html',
  styleUrl: './about-business.component.sass'
})
export class AboutBusinessComponent {
  
  aboutForm:FormGroup = this.fb.group({
    date: ['', Validators.required],
    employees:['', Validators.required]


  })

  constructor(private fb:FormBuilder){}
}
