import { Component } from '@angular/core';
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

@Component({
  selector: 'app-service-category-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    ServiceListingComponent,
    DialogModule,
    InputTextModule,
    ImageUploaderComponent,
  ],
  templateUrl: './service-category-creation.component.html',
  styleUrl: './service-category-creation.component.sass',
})
export class ServiceCategoryCreationComponent {
  visible: boolean = false;
  serviceCategoryForm: FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    description: ['Some description'],
    serviceImage: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {}

  showDialog() {
    this.visible = true;
  }

  onImageUploaded(file: File) {
    this.serviceCategoryForm.patchValue({
      serviceImage: file,
    });
    console.log('Uploaded file', file);
  }

  submitForm() {
    if (this.serviceCategoryForm.valid) {
      this.onSubmit();
    } else {
      console.log('Form is invalid');
    }
  }

  onSubmit() {
    const serviceCategory: ServiceCategory = {
      name: this.serviceCategoryForm.value.categoryName,
      description: this.serviceCategoryForm.value.description,
      image: this.serviceCategoryForm.value.serviceImage,
    };

    this.serviceService.createService(serviceCategory).subscribe({
      next: (response) => console.log('Response:', response),
      error: (error) => console.error('Error:', error),
    });
  }
}
