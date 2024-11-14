import { Component } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchedulingComponent } from "../../../service-provider/pages/scheduling/scheduling.component";
import { SocialsComponent } from "../socials/socials.component";

@Component({
  selector: 'app-about-business',
  standalone: true,
  imports: [FieldsComponent, RouterLink, ReactiveFormsModule, SchedulingComponent, SocialsComponent],
  templateUrl: './about-business.component.html',
  styleUrl: './about-business.component.sass'
})
export class AboutBusinessComponent {
  
  aboutForm:FormGroup = this.fb.group({
    date: ['', Validators.required],
    employees:['', Validators.required]
  })

  constructor(private fb:FormBuilder,private router:Router){}

  navigateTo(){
    this.router.navigateByUrl('/registration/basic-info');
  }
}
