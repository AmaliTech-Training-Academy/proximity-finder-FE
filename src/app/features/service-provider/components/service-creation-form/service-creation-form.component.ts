import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { accountPreferences, bookingDays } from '../../data';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { ServiceService } from '../../../../core/services/service.service';
import { ITime } from '../../../../core/models/ITime';

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
  serviceCategories$ = this.serviceService.serviceCategories$;
  accountPreferences = accountPreferences;
  days = bookingDays;
  timeOptions: ITime[] = [];

  serviceForm: FormGroup = this.fb.group({
    jobTitle: ['', Validators.required],
    accountPreference: ['', Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    businessCertificate: [null],
    serviceDescription: ['', Validators.required],
    schedulingPolicy: [''],
    projectPictures: [[]],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {}

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

  get bookingDaysFormArray(): FormArray {
    return this.serviceForm.get('bookingDays') as FormArray;
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
}
