import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { ServiceResponse } from '../../../../core/models/IServiceResponse';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { IPaymentAccount } from '../../../../core/models/payment-account';
import { Observable, Subscription } from 'rxjs';

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
export class ServiceCreationFormComponent implements OnInit, OnDestroy {
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  // serviceCategories;
  serviceCategories$ = this.serviceService.serviceCategories$;
  linkedAccounts$: Observable<IPaymentAccount[]> =
    this.profileService.paymentAccounts$;

  linkedAccounts!: IPaymentAccount[];

  accountPreferences = accountPreferences;
  days = bookingDays;
  timeOptions: ITime[] = [];
  businessCertificates: File[] = [];
  projectPictures: File[] = [];
  selectedLocation!: PlaceSearchResult;
  isSameLocation: boolean = true;

  linkedAccountsSubscription!: Subscription;

  serviceForm: FormGroup = this.fb.group({
    serviceName: ['', Validators.required],
    accountPreference: ['', Validators.required],
    bookingDays: this.fb.array([this.createBookingDay()]),
    schedulingPolicy: [''],
    projectTitle: ['', Validators.required],
    serviceDescription: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private profileService: ProfileService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.generateTimeOptions(15);
  }

  ngOnInit(): void {
    this.profileService.getPaymentAccounts();
    this.linkedAccountsSubscription = this.linkedAccounts$.subscribe({
      next: (linkedAccounts) => {
        this.linkedAccounts = linkedAccounts.map((account) => ({
          ...account,
          label: account.phoneNumber
            ? `${account.serviceProvider} - ${account.phoneNumber}`
            : `${account.bankName} - ${account.accountNumber}`,
        }));
      },
    });
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

  getAccountLabel(account: any) {
    return account.accountNumber;
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const servicePreferenceData = new FormData();
      const serviceExperienceData = new FormData();
      const formValue = this.serviceForm.value;

      const locationData = {
        placeName: this.selectedLocation.address,
        latitude: this.selectedLocation.location?.lat(),
        longitude: this.selectedLocation.location?.lng(),
      };

      const formattedBookingDays = formValue.bookingDays.map((day: any) => ({
        dayOfWeek: (day.dayOfWeek?.name || day.dayOfWeek)
          .toString()
          .toUpperCase(),
        startTime: this.formatTime(day.startTime),
        endTime: this.formatTime(day.endTime),
      }));

      // Service Preference Data
      servicePreferenceData.append(
        'serviceName',
        formValue.serviceName.name || formValue.serviceName
      );
      servicePreferenceData.append(
        'paymentPreference',
        formValue.accountPreference.paymentPreference ||
          formValue.accountPreference
      );

      servicePreferenceData.append('placeName', locationData.placeName);
      servicePreferenceData.append(
        'latitude',
        String(locationData.latitude ?? '')
      );
      servicePreferenceData.append(
        'longitude',
        String(locationData.longitude ?? '')
      );

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

      // Service Experience Data
      serviceExperienceData.append('projectTitle', formValue.projectTitle);
      serviceExperienceData.append('description', formValue.serviceDescription);

      this.projectPictures.forEach((file) => {
        serviceExperienceData.append('images', file);
      });

      // Send service preference data
      this.serviceService
        .setServicePreference(servicePreferenceData)
        .subscribe({
          next: (response: any) => {
            const serviceId = response.result.id;
            serviceExperienceData.append('providerServiceId', serviceId);

            // Send service experience data
            this.serviceService
              .createServiceExperience(serviceExperienceData)
              .subscribe({
                next: () => {
                  this.notyf.success('Service created successfully'),
                    this.closeDialog();
                },
              });
          },
          error: () => this.notyf.error('Failed to create service'),
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

  ngOnDestroy(): void {
    if (this.linkedAccountsSubscription) {
      this.linkedAccountsSubscription.unsubscribe();
    }
  }
}
