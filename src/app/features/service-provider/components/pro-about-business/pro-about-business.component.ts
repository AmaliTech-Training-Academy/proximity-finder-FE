import { Component, OnInit } from '@angular/core';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileService } from '../../../profile-management/services/profile.service';

@Component({
  selector: 'app-pro-about-business',
  standalone: true,
  imports: [
    FileUploaderComponent,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pro-about-business.component.html',
  styleUrl: './pro-about-business.component.sass',
})
export class ProAboutBusinessComponent implements OnInit {
  isEditing = false;
  maxSocialLinks = 5;
  socialMediaLinks: string[] = [];
  businessCertificate: string = '';
  businessId: string = '';

  aboutBusinessForm: FormGroup = this.fb.group({
    inceptionDate: [
      { value: '10/12/2024', disabled: true },
      Validators.required,
    ],
    businessCertificate: [{ value: null, disabled: true }],
    socialLinks: this.fb.array(['', Validators.required]),
    numberOfEmployees: [{ value: 200, disabled: true }, Validators.required],
    businessID: [null],
    summary: [''],
  });

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getProviderBusinessInfo().subscribe({
      next: (businessInfo) => {
        this.aboutBusinessForm.patchValue({
          inceptionDate: businessInfo.inceptionDate,
          businessCertificate: businessInfo.businessCertificate,
          numberOfEmployees: businessInfo.numberOfEmployees,
          businessId: businessInfo.businessIdentityCard,
          summary: businessInfo.businessSummary,
        });
        this.socialMediaLinks = businessInfo.socialMediaLinks;
        this.businessCertificate = businessInfo.businessCertificate;
        this.businessId = businessInfo.businessIdentityCard;
        // console.log(this.socialMediaLinks);
      },
    });
  }

  get socialLinks() {
    return this.aboutBusinessForm.get('socialLinks') as FormArray;
  }

  addSocialLink() {
    if (this.socialLinks.length < this.maxSocialLinks) {
      this.socialLinks.push(this.fb.control(''));
    }
  }

  setEditing() {
    this.isEditing = true;
    this.toggleFormControls();
  }

  cancelEditing() {
    this.isEditing = false;
    this.toggleFormControls();
  }

  toggleFormControls() {
    Object.keys(this.aboutBusinessForm.controls).forEach((controlName) => {
      const control = this.aboutBusinessForm.get(controlName);
      if (this.isEditing) {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  isMaxLimitReached() {
    return this.socialLinks.length >= this.maxSocialLinks;
  }
}
