import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { User } from '../../../profile-management/models/user';
import { Subscription } from 'rxjs';
import { ProviderData } from '../../../../core/models/ProviderData';

@Component({
  selector: 'app-pro-basic-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pro-basic-info.component.html',
  styleUrl: './pro-basic-info.component.sass',
})
export class ProBasicInfoComponent implements OnInit, OnDestroy {
  providerData!: ProviderData;
  isEditing = false;
  subscription!: Subscription;

  basicInfoForm: FormGroup = this.fb.group({
    businessName: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
    businessEmail: [{ value: '', disabled: true }, Validators.required],
    businessAddress: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
    businessOwnerName: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
    phoneNumber: [
      { value: '', disabled: !this.isEditing },
      Validators.required,
    ],
  });

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.subscription = this.profileService.getClient().subscribe({
      next: (user) => {
        this.providerData = user;
        this.basicInfoForm.patchValue({
          businessName: user.userName,
          businessEmail: user.email,
          businessAddress: user.placeName,
          businessOwnerName: user.businessOwnerName,
          phoneNumber: user.mobileNumber,
        });
      },
      error: (error) => console.error('Failed to fetch user', error),
    });
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
    Object.keys(this.basicInfoForm.controls).forEach((controlName) => {
      const control = this.basicInfoForm.get(controlName);
      if (this.isEditing && controlName !== 'businessEmail') {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  onSubmit() {
    if (this.basicInfoForm.valid) {
      console.log(this.basicInfoForm.value);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
