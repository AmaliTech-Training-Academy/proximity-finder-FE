import { Component, Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ServiceListingComponent } from '../service-listing/service-listing.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageUploaderComponent } from '../../../service-provider/components/image-uploader/image-uploader.component';
import { ServiceService } from '../../../../core/services/service.service';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';
import { AdminServiceCreationFormComponent } from '../admin-service-creation-form/admin-service-creation-form.component';

@Component({
  selector: 'app-service-category-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    AdminServiceCreationFormComponent,
  ],
  templateUrl: './service-category-creation.component.html',
  styleUrl: './service-category-creation.component.sass',
})
export class ServiceCategoryCreationComponent {
  visible: boolean = false;
  serviceCategoryForm: FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    description: [''],
    serviceImage: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  showDialog() {
    this.visible = true;
  }

  resetDialog() {
    this.visible = false;
  }
}
