import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  Inject,
  OnDestroy,
} from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-service-creation-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ImageUploaderComponent,
  ],
  templateUrl: './admin-service-creation-form.component.html',
  styleUrls: ['./admin-service-creation-form.component.sass'],
})
export class AdminServiceCreationFormComponent implements OnChanges, OnDestroy {
  @Input() serviceCategoryId!: string | undefined;
  @Input() serviceCategory?: ServiceCategory;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  isImageModified: boolean = false;
  private subscriptions: Subscription = new Subscription();

  serviceCategoryForm: FormGroup = this.fb.group({
    categoryName: ['', Validators.required],
    description: ['', Validators.required],
    serviceImage: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['serviceCategory'] && changes['serviceCategory'].currentValue) {
      this.serviceCategoryForm.patchValue({
        categoryName: this.serviceCategory?.name || '',
        description: this.serviceCategory?.description || '',
        serviceImage: this.serviceCategory?.image || null,
      });
    }
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onImageUploaded(file: File) {
    this.isImageModified = true;
    this.serviceCategoryForm.patchValue({
      serviceImage: file,
    });
  }

  submitForm() {
    if (this.serviceCategoryForm.valid) {
      const formData = this.serviceCategoryForm.value;

      const serviceCategory: Partial<ServiceCategory> = {
        id: this.serviceCategoryId,
        name: formData.categoryName,
        description: formData.description,
      };

      if (this.isImageModified) {
        serviceCategory.image = formData.serviceImage;
      }

      this.onSubmit(serviceCategory as ServiceCategory);
    }
  }

  onSubmit(serviceCategory: ServiceCategory) {
    // Update service
    const subscription = (
      serviceCategory.id
        ? this.serviceService.updateService(serviceCategory)
        : this.serviceService.createService(serviceCategory)
    ).subscribe({
      next: () => {
        this.notyf.success(
          serviceCategory.id
            ? 'Service updated successfully'
            : 'Service created successfully'
        );
        this.closeDialog();
        this.serviceService.getServices();
      },
      error: () => {
        this.notyf.error(
          serviceCategory.id
            ? 'Failed to update service'
            : 'Failed to create service'
        );
      },
    });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
