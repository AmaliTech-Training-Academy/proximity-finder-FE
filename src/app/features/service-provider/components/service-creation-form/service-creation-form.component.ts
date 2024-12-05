import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
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
import { PlaceSearchResult } from '../../../../core/models/place-search-result';
import { LocationsComponent } from '../../../../shared/components/locations/locations.component';

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
    LocationsComponent,
  ],
  templateUrl: './service-creation-form.component.html',
  styleUrl: './service-creation-form.component.sass',
})
export class ServiceCreationFormComponent {
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  serviceCategories$ = this.serviceService.serviceCategories$;

  accountPreferences = accountPreferences;
  days = bookingDays;
  timeOptions: ITime[] = [];
  businessCertificates: File[] = [];
  projectPictures: File[] = [];
  selectedLocation!: PlaceSearchResult;
  isSameLocation: boolean = true;

  serviceForm: FormGroup = this.fb.group({
    serviceName: ['', Validators.required],
    accountPreference: ['', Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    schedulingPolicy: [''],
    projectTitle: ['', Validators.required],
    serviceDescription: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {
    this.generateTimeOptions(15);
  }

  onFilesSelected(files: File[]) {
    this.businessCertificates = files;
  }

  onImagesUploaded(images: File[]) {
    this.projectPictures = images;
  }

  onLocationSelected(location: PlaceSearchResult) {
    this.selectedLocation = location;
  }

  setSameLocation(event: any) {
    this.isSameLocation = event.value.value;
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

  closeDialog() {
    this.closeDialogEvent.emit(false);
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const servicePreferenceData = new FormData();
      const formValue = this.serviceForm.value;

      const formattedBookingDays = formValue.bookingDays.map((day: any) => ({
        dayOfWeek: (day.dayOfWeek?.name || day.dayOfWeek)
          .toString()
          .toUpperCase(),
        startTime: this.formatTime(day.startTime),
        endTime: this.formatTime(day.endTime),
      }));

      servicePreferenceData.append(
        'serviceName',
        formValue.serviceName.name || formValue.serviceName
      );
      servicePreferenceData.append(
        'accountPreference',
        formValue.accountPreference.name || formValue.accountPreference
      );
      servicePreferenceData.append('placeName', formValue.location);
      servicePreferenceData.append(
        'bookingDays',
        JSON.stringify(formattedBookingDays)
      );
      servicePreferenceData.append(
        'schedulingPolicy',
        formValue.schedulingPolicy
      );

      this.businessCertificates.forEach((file) => {
        servicePreferenceData.append('documents', file);
      });

      servicePreferenceData.forEach((key, value) => {
        console.log(`${key}: ${value}`);
      });

      // Send service preference data
      this.serviceService
        .setServicePreference(servicePreferenceData)
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error),
        });
    } else {
      console.log('Form invalid');
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
}
