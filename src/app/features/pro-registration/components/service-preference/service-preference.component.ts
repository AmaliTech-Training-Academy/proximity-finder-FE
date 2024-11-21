import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  accountPreferences,
  bookingDays,
  serviceCategories,
} from '../../../service-provider/data';
import { FileUploaderComponent } from '../../../service-provider/components/file-uploader/file-uploader.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../../../core/services/service.service';
import { ITime } from '../../../../core/models/ITime';

@Component({
  selector: 'app-service-preference',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FileUploaderComponent,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-preference.component.html',
  styleUrls: ['./service-preference.component.sass'],
})
export class ServicePreferenceComponent {
  serviceCategories = serviceCategories;
  paymentPreferences = accountPreferences;
  days = bookingDays;
  timeOptions: ITime[] = [];
  uploadedFiles: File[] = [];

  servicePreferenceForm: FormGroup = this.fb.group({
    service: [null, Validators.required],
    paymentPreference: [null, Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    sameLocation: [null, Validators.required],
    location: ['', Validators.required],
    documents: [null],
    schedulingPolicy: [''],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private serviceService: ServiceService
  ) {
    this.generateTimeOptions(15);
  }

  onFilesSelected(files: File[]): void {
    this.uploadedFiles = files;
  }

  get bookingDaysFormArray(): FormArray {
    return this.servicePreferenceForm.get('bookingDays') as FormArray;
  }

  createBookingDay(): FormGroup {
    return this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  addBookingDay() {
    this.bookingDaysFormArray.push(this.createBookingDay());
  }

  removeBookingDay(index: number) {
    if (this.bookingDaysFormArray.length > 1) {
      this.bookingDaysFormArray.removeAt(index);
    }
  }

  generateTimeOptions(step: number) {
    const times: ITime[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const rawTime = new Date();
        rawTime.setHours(hour, minute, 0);

        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        } as Intl.DateTimeFormatOptions;
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(
          rawTime
        );

        times.push({ name: formattedTime, value: formattedTime });
      }
    }
    this.timeOptions = times;
  }

  onSubmit() {
    if (this.servicePreferenceForm.valid) {
      const formData = new FormData();

      Object.keys(this.servicePreferenceForm.value).forEach((key) => {
        if (key !== 'documents') {
          formData.append(key, this.servicePreferenceForm.value[key]);
        }
      });

      this.uploadedFiles.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });

      formData.forEach((value, key) => console.log(key, value));

      this.http
        .post(
          'https://2ed7-196-61-35-158.ngrok-free.app/api/v1/provider-services',
          formData
        )
        .subscribe({
          next: (response) => console.log('Response:', response),
          error: (error) => console.error('Error:', error),
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
