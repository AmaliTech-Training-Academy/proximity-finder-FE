import { Component } from '@angular/core';
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
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-preference',
  standalone: true,
  imports: [
    DropdownModule,
    FileUploaderComponent,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
  ],
  templateUrl: './service-preference.component.html',
  styleUrl: './service-preference.component.sass',
})
export class ServicePreferenceComponent {
  serviceCategories = serviceCategories;
  paymentPreferences = accountPreferences;
  bookingDays = bookingDays;
  timeOptions: { name: string; value: string }[] = [];
  constructor() {
    this.generateTimeOptions(15);
  }

  generateTimeOptions(step: number) {
    const times: { name: string; value: string }[] = [];
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
