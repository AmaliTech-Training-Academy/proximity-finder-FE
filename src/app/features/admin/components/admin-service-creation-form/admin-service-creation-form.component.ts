import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ImageUploaderComponent } from '../../../service-provider/components/image-uploader/image-uploader.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../../core/services/service.service';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-admin-service-creation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ImageUploaderComponent,
  ],
  templateUrl: './admin-service-creation-form.component.html',
  styleUrl: './admin-service-creation-form.component.sass',
})
export class AdminServiceCreationFormComponent {
  @Input() serviceCategory: ServiceCategory | null = null;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  serviceCategoryForm: FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    description: [''],
    serviceImage: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    if (this.serviceCategory) {
      console.log(this.serviceCategory);
    }
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visibleChange.emit(false);
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
      this.serviceCategoryForm.reset();
      this.visibleChange.emit(false);
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
      next: (response) => {
        this.serviceService.getServices();
        this.notyf.success('Service has been created successfully');
        console.log('Response:', response);
      },
      error: (error) => console.error('Error:', error),
    });
  }
}
