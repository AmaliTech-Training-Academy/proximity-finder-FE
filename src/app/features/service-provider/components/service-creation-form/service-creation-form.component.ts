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
  ],
  templateUrl: './service-creation-form.component.html',
  styleUrl: './service-creation-form.component.sass',
})
export class ServiceCreationFormComponent {
  accountPreferences = accountPreferences;
  serviceForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      jobTitle: ['', Validators.required],
      accountPreference: ['', Validators.required],
      businessCertificate: [null],
      serviceDescription: ['', Validators.required],
      schedulingPolicy: [''],
      projectPictures: [[]],
    });
  }

  selectedFile: File | null = null;
  selectedFileName: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Handle file upload logic
      console.log('Uploading:', this.selectedFile);
      // Reset after upload if desired
      this.selectedFile = null;
      this.selectedFileName = '';
    } else {
      alert('Please select a file first!');
    }
  }
}
