import { Component, Inject, OnInit } from '@angular/core';
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
export class ServiceExperienceComponent implements OnInit {
  isImageModified: boolean = false;
  providerServiceId = this.serviceService.providerServiceId;

  experienceForm: FormGroup = this.fb.group({
    projectTitle: ['', Validators.required],
    description: ['', Validators.required],
    projectImages: [null],
  });

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.providerServiceId);
  }

  onImageUploaded(files: File[]) {
    this.isImageModified = true;
    this.experienceForm.patchValue({
      projectImages: files,
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const formData = new FormData();

      formData.append('providerServiceId', this.providerServiceId);
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
        next: (response) => {
          this.notyf.success('Service Experience Added Successfully');
          this.navigateTo();
        },
        error: (error) => this.notyf.error('Failed to add service experience'),
      });
    }
  }

  navigateTo() {
    this.router.navigateByUrl('/registration/preview');
  }
}
