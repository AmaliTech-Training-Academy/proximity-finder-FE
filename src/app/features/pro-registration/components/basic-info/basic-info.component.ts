import { Component, Inject } from '@angular/core';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { FieldsComponent } from "../fields/fields.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { userInfo } from '../../models/userData';
import { BasicInfoService } from '../../services/basic-info/basic-info.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [ProfileUpdateComponent, FieldsComponent,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.sass'
})
export class BasicInfoComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private basicInfoService: BasicInfoService,
    private localStorageService: LocalStorageService,
    @Inject(NOTYF) private notyf: Notyf,
  ) {
    this.registrationForm = this.formBuilder.group({
      businessOwnerName: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^\\+?[1-9]\\d{1,14}(?:[\\s\\-]\\d{1,4})*$')
      ]],
      businessAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const savedUserData = this.localStorageService.getItem<{ email: string; userName: string }>('userData');
    
    if (savedUserData && typeof savedUserData === 'object') {
      this.registrationForm.patchValue({
        userName: savedUserData.userName || '',  
        email: savedUserData.email || ''
      }, { emitEvent: false });
    } 
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData: userInfo = {
        businessOwnerName: this.registrationForm.get('businessOwnerName')?.value,
        mobileNumber: this.registrationForm.get('mobileNumber')?.value,
        businessAddress: this.registrationForm.get('businessAddress')?.value,
     
      };
      

      this.basicInfoService.sendInfo(formData).subscribe({
        next: (response) => {
          this.notyf.success('Information Saved');
          
        },
        error: (error) => {
          this.notyf.error('Failed to save data');
        }
      });
    }
  }
  }



