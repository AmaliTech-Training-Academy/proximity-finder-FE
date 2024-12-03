import { Component, Inject } from '@angular/core';
import { ImageUploaderComponent } from '../../../service-provider/components/image-uploader/image-uploader.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ServiceService } from '../../../../core/services/service.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-experience',
  standalone: true,
  imports: [
    ImageUploaderComponent,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './service-experience.component.html',
  styleUrl: './service-experience.component.sass',
})
export class ServiceExperienceComponent {
  isImageModified: boolean = false;

  experienceForm: FormGroup = this.fb.group({
    projectTitle: ['', Validators.required],
    description: ['', Validators.required],
    projectImages: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf,
   private router:Router
  ) {}

  onImageUploaded(files: File[]) {
    this.isImageModified = true;
    this.experienceForm.patchValue({
      projectImages: files,
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const formData = new FormData();

      formData.append(
        'providerServiceId',
        '913b5b2e-1de9-436e-a8ae-edc2f2578db9'
      );
      formData.append(
        'projectTitle',
        this.experienceForm.get('projectTitle')?.value
      );
      formData.append(
        'description',
        this.experienceForm.get('description')?.value
      );

      const images = this.experienceForm.get('projectImages')?.value;
      if (images && images.length > 0) {
        images.forEach((image: File, index: number) => {
          formData.append('images', image);
        });
      }

      this.serviceService.createServiceExperience(formData).subscribe({
        next: (response) =>
          this.notyf.success('Service Experience Added Successfully'),
        error: (error) => this.notyf.error('Failed to add service experience'),
      });
    }
  }
  
  navigateTo() {
    this.router.navigateByUrl('/registration/service-preference');
  }
}
