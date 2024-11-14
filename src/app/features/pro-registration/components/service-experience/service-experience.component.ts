import { Component } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { ImageUploaderComponent } from "../../../service-provider/components/image-uploader/image-uploader.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-experience',
  standalone: true,
  imports: [FieldsComponent, ImageUploaderComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './service-experience.component.html',
  styleUrl: './service-experience.component.sass'
})
export class ServiceExperienceComponent {
  experienceForm:FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });


  constructor(private fb: FormBuilder) {}


  onSubmit(): void {
    if (this.experienceForm.valid) {
      
    } 
  }

}
