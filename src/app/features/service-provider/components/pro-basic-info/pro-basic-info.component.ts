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

@Component({
  selector: 'app-pro-basic-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pro-basic-info.component.html',
  styleUrl: './pro-basic-info.component.sass',
})
export class ProBasicInfoComponent implements OnInit, OnDestroy {
  loggedInuser!: User | null;
  isEditing = false;
  subscription!: Subscription;

  basicInfoForm: FormGroup = this.fb.group({
    businessName: [
      { value: 'Strive Studios', disabled: !this.isEditing },
      Validators.required,
    ],
    businessEmail: [
      { value: 'oliviarhye@gmail.com', disabled: !this.isEditing },
      Validators.required,
    ],
    businessAddress: [
      { value: 'AG-345-4738', disabled: !this.isEditing },
      Validators.required,
    ],
    businessOwnerName: [
      { value: 'Sarah Johnson', disabled: !this.isEditing },
      Validators.required,
    ],
    phoneNumber: [
      { value: '020 378 234 3672', disabled: !this.isEditing },
      Validators.required,
    ],
  });

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.subscription = this.profileService.loggedInUser$.subscribe({
      next: (user) => (this.loggedInuser = user),
    });
    this.profileService.getClient().subscribe({
      next: (client) => console.log(client),
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
      if (this.isEditing) {
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
