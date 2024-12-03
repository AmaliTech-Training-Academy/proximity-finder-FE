import { Component, Inject, OnInit } from '@angular/core';
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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Router } from '@angular/router';

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
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './service-preference.component.html',
  styleUrls: ['./service-preference.component.sass'],
})
export class ServicePreferenceComponent {
  serviceCategories$ = this.serviceService.serviceCategories$;
  paymentPreferences = accountPreferences;
  days = bookingDays;
  visible: boolean = false;
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
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf,
    private router:Router
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
      const formValue = this.servicePreferenceForm.value;

      const formattedBookingDays = formValue.bookingDays.map((day: any) => ({
        dayOfWeek: (day.dayOfWeek?.name || day.dayOfWeek)
          .toString()
          .toUpperCase(),
        startTime: this.formatTime(day.startTime),
        endTime: this.formatTime(day.endTime),
      }));

      formData.append('userId', '33252a99-ab98-4413-9191-6f93c6df5806');

      formData.append(
        'serviceName',
        formValue.service.name || formValue.service
      );

      formData.append(
        'paymentPreference',
        formValue.paymentPreference.name || formValue.paymentPreference
      );

      formData.append('sameLocation', formValue.sameLocation ? 'yes' : 'no');

      formData.append('location', formValue.location);

      formData.append('bookingDays', JSON.stringify(formattedBookingDays));

      if (formValue.schedulingPolicy) {
        formData.append('schedulingPolicy', formValue.schedulingPolicy);
      }

      this.uploadedFiles.forEach((file, index) => {
        formData.append('documents', file);
      });

      formData.forEach((value, key) => console.log(key, value));

      this.serviceService.setServicePreference(formData).subscribe({
        next: (response) => this.notyf.success('Service preference saved'),
        error: (error) => this.notyf.error('Failed to save preference'),
      });
    } else {
      console.error('Form is invalid');
    }
  }

  private formatTime(time: any): string {
    const timeString = time?.name || time?.value || time;

    if (typeof timeString === 'string' && timeString.match(/^\d{2}:\d{2}$/)) {
      return timeString;
    }

    const [timeStr, period] = timeString.toString().split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  showDialog() {
    this.visible = true;
  }


  navigateTo() {
    this.router.navigateByUrl('/registration/payment-method');
  }
}
