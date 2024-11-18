import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  accountPreferences,
  serviceCategories,
} from '../../../service-provider/data';
import { FileUploaderComponent } from '../../../service-provider/components/file-uploader/file-uploader.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-service-preference',
  standalone: true,
  imports: [
    DropdownModule,
    FileUploaderComponent,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './service-preference.component.html',
  styleUrl: './service-preference.component.sass',
})
export class ServicePreferenceComponent {
  serviceCategories = serviceCategories;
  paymentPreferences = accountPreferences;
}
