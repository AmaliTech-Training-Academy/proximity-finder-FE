import { Component, ViewChild } from '@angular/core';
import { FieldsComponent } from "../fields/fields.component";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialsComponent } from "../socials/socials.component";
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from "../../../service-provider/components/file-uploader/file-uploader.component";
import { AboutService } from '../../services/about/about.service';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
  selector: 'app-about-business',
  standalone: true,
  imports: [
    FieldsComponent,
    ReactiveFormsModule,
    SocialsComponent,
    CommonModule,
    FileUploaderComponent,
  ],
  templateUrl: './about-business.component.html',
  styleUrls: ['./about-business.component.sass']
})
export class AboutBusinessComponent {
  @ViewChild(SocialsComponent) socialsComponent!: SocialsComponent;

  aboutForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
    employees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    summary: ['', Validators.required],
    businessIdentityCard: [null, Validators.required],
    businessCertificate: [null, Validators.required],
  });

  isSocialsValid: boolean = true; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aboutService: AboutService,
    private localStorageService:LocalStorageService
  ) {}

  // Handle the validity change from the SocialsComponent
  onSocialsValidStateChange(isValid: boolean) {
    this.isSocialsValid = isValid; 
  }

  navigateTo() {
    this.router.navigateByUrl('/registration/basic-info');
  }

  onFileSelected(fileType: 'businessIdentityCard' | 'businessCertificate', files: File[]) {
    if (files.length > 0) {
      this.aboutForm.get(fileType)?.setValue(files[0]);
    } else {
      this.aboutForm.get(fileType)?.setValue(null);
    }
  }

  onSubmit() {
    if (this.aboutForm.valid && this.isSocialsValid) {
      const formData = new FormData();
      formData.append('inceptionDate', this.aboutForm.get('date')?.value);
      formData.append('numberOfEmployees', this.aboutForm.get('employees')?.value);
      formData.append('businessSummary', this.aboutForm.get('summary')?.value);
      formData.append('businessIdentityCard', this.aboutForm.get('businessIdentityCard')?.value);
      formData.append('businessCertificate', this.aboutForm.get('businessCertificate')?.value);

      const socialLinks = this.socialsComponent.selectedSocialMedias
        .filter(media => media.link)
        .map(media => ({ name: media.name, link: media.link }));

      if (socialLinks.length > 0) {
        formData.append('socialMediaLinks', JSON.stringify(socialLinks));
      }

      const token = this.localStorageService.getItem('accessToken');

      
      const headers = new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : '',
      });
      this.aboutService.sendAbout(formData, { headers }).subscribe({
        next: (response) => console.log('Form submitted successfully', response),
        error: (err) => console.error('Error submitting form', err),
      });
    }
  }
}
