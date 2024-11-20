import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { accountPreferences, bookingDays } from '../../data';
import { ITime } from '../../../../core/models/ITime';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { ServiceService } from '../../../../core/services/service.service';
import { ServiceResponse } from '../../../../core/models/IServiceResponse';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';

@Component({
  selector: 'app-pro-service-preference',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    FileUploaderComponent,
  ],
  templateUrl: './pro-service-preference.component.html',
  styleUrl: './pro-service-preference.component.sass',
})
export class ProServicePreferenceComponent {
  isEditing = true;
  serviceCategories: ServiceCategory[] = [];
  paymentPreferences = accountPreferences;
  days = bookingDays;
  timeOptions: ITime[] = [];

  servicePreferenceForm: FormGroup = this.fb.group({
    service: [{ value: '', disabled: !this.isEditing }, Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    paymentPreference: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
    location: [{ value: '', disabled: !this.isEditing }, Validators.required],
    schedulingPolicy: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
  });

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {
    this.generateTimeOptions(15);
  }

  ngOnInit() {
    this.serviceService.getServices().subscribe({
      next: (response) => {
        this.serviceCategories = response;
      },
      error: (error) => console.error('Error:', error),
    });
  }

  setEditing() {
    this.isEditing = true;
    this.toggleFormControls();
    console.log(this.isEditing);
  }

  cancelEditing() {
    this.isEditing = false;
    this.toggleFormControls();
  }

  toggleFormControls() {
    Object.keys(this.servicePreferenceForm.controls).forEach((controlName) => {
      const control = this.servicePreferenceForm.get(controlName);
      if (this.isEditing) {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  createBookingDay(): FormGroup {
    return this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  get bookingDaysFormArray(): FormArray {
    return this.servicePreferenceForm.get('bookingDays') as FormArray;
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
}
