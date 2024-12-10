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
  FormsModule,
} from '@angular/forms';
import { CommonModule, Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../../../core/services/service.service';
import { ITime } from '../../../../core/models/ITime';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { LocationsComponent } from '../../../../shared/components/locations/locations.component';
import { PlaceSearchResult } from '../../../../core/models/place-search-result';
import { BusinessAddressComponent } from '../business-address/business-address.component';
import { Router } from '@angular/router';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { Payment } from '../../models/payment';
import { IPaymentAccount } from '../../../../core/models/payment-account';
import { ServiceResponse } from '../../../../core/models/IServiceResponse';

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
    BusinessAddressComponent,
    FormsModule,
  ],
  templateUrl: './service-preference.component.html',
  styleUrls: ['./service-preference.component.sass'],
})
export class ServicePreferenceComponent implements OnInit {
  serviceCategories$ = this.serviceService.serviceCategories$;
  paymentPreferences = accountPreferences;
  days = bookingDays;
  visible: boolean = false;
  timeOptions: ITime[] = [];
  uploadedFiles: File[] = [];
  location!: PlaceSearchResult;
  loggedInuser$ = this.profileService.loggedInUser$;
  paymentAccounts$ = this.profileService.paymentAccounts$;
  paymentMethod!: IPaymentAccount;

  servicePreferenceForm: FormGroup = this.fb.group({
    service: [null, Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    documents: [null],
    schedulingPolicy: [''],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.generateTimeOptions(15);
  }

  ngOnInit(): void {
    this.profileService.getPaymentAccounts();
    this.loggedInuser$.subscribe({
      next: (user) => console.log(user),
    });
    this.paymentAccounts$.subscribe({
      next: (paymentAccounts) => (this.paymentMethod = paymentAccounts[0]),
    });
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

  onLocationSelected(location: PlaceSearchResult) {
    console.log(location.location?.lng());
    this.location = location;
  }

  onSubmit() {
    if (this.servicePreferenceForm.valid) {
      const formData = new FormData();
      const formValue = this.servicePreferenceForm.value;
      const locationData = {
        placeName: this.location.address,
        latitude: this.location.location?.lat(),
        longitude: this.location.location?.lng(),
      };

      const formattedBookingDays = formValue.bookingDays.map((day: any) => ({
        dayOfWeek: (day.dayOfWeek?.name || day.dayOfWeek)
          .toString()
          .toUpperCase(),
        startTime: this.formatTime(day.startTime),
        endTime: this.formatTime(day.endTime),
      }));

      // TODO: Send currently logged in service provider's id
      formData.append('userId', '33252a99-ab98-4413-9191-6f93c6df5806');

      formData.append(
        'serviceName',
        formValue.service.name || formValue.service
      );

      formData.append('paymentPreference', JSON.stringify(this.paymentMethod));

      formData.append('placeName', locationData.placeName);
      formData.append('latitude', String(locationData.latitude ?? ''));
      formData.append('longitude', String(locationData.longitude ?? ''));

      formData.append('bookingDays', JSON.stringify(formattedBookingDays));

      if (formValue.schedulingPolicy) {
        formData.append('schedulingPolicy', formValue.schedulingPolicy);
      }

      this.uploadedFiles.forEach((file, index) => {
        formData.append('documents', file);
      });

      formData.forEach((value, key) => console.log(key, value));

      this.serviceService.setServicePreference(formData).subscribe({
        next: (response: any) => {
          const providerServiceId = response.result.id;
          this.serviceService.setProviderServiceId(providerServiceId);
          this.notyf.success('Service preference saved');
          this.navigateTo();
        },
        error: () => this.notyf.error('Failed to save preference'),
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
    this.router.navigateByUrl('/registration/service-experience');
  }
}
