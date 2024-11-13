import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { accountPreferences } from '../../data';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-service-creation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploaderComponent,
    ImageUploaderComponent,
  ],
  templateUrl: './service-creation-form.component.html',
  styleUrl: './service-creation-form.component.sass',
})
export class ServiceCreationFormComponent {
  accountPreferences = accountPreferences;

  serviceForm: FormGroup = this.fb.group({
    jobTitle: ['', Validators.required],
    accountPreference: ['', Validators.required],
    businessCertificate: [null],
    serviceDescription: ['', Validators.required],
    schedulingPolicy: [''],
    projectPictures: [[]],
  });

  constructor(private fb: FormBuilder) {}
}
