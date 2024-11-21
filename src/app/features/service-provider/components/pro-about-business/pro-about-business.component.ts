import { Component } from '@angular/core';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-pro-about-business',
  standalone: true,
  imports: [FileUploaderComponent, InputGroupModule, InputGroupAddonModule],
  templateUrl: './pro-about-business.component.html',
  styleUrl: './pro-about-business.component.sass',
})
export class ProAboutBusinessComponent {
  isEditing = false;
  maxSocialLinks = 5;

  aboutBusinessForm: FormGroup = this.fb.group({
    inceptionDate: [
      { value: '10/12/2024', disabled: !this.isEditing },
      Validators.required,
    ],
    businessCertificate: [{ value: null, disabled: !this.isEditing }],
    socialLinks: this.fb.array(['', Validators.required]),
    numberOfEmployees: [
      { value: 200, disabled: !this.isEditing },
      Validators.required,
    ],
    businessID: [null],
    summary: [''],
  });

  constructor(private fb: FormBuilder) {}

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
