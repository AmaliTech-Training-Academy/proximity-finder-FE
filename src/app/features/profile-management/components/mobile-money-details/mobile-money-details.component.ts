import { Component, inject, OnInit } from '@angular/core';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { UserMobileMoneyService } from '../../services/user-mobile-money.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IMobileMoney } from '../../models/mobile-money';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-mobile-money-details',
  standalone: true,
  imports: [FieldsComponent, CommonModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './mobile-money-details.component.html',
  styleUrl: './mobile-money-details.component.sass'
})
export class MobileMoneyDetailsComponent implements OnInit {
  serviceProviders!: Observable<string[]>
  selectedProvider!: string
  private notyf = inject(NOTYF)

  constructor(private mobileService: UserMobileMoneyService, private fb: FormBuilder) {}

  mobileMoneyForm = this.fb.group({
    provider: ['', Validators.required],
    accountName: ['', Validators.required],
    accountAlias: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  })

  ngOnInit() {
    this.serviceProviders = this.mobileService.getServiceProviders()
  }

  onSubmit() {
    if(this.mobileMoneyForm.valid) {
      const paymentPreference = 'Mobile Money'
      const momoInfo: IMobileMoney = {
        paymentPreference,
        serviceProvider: this.mobileMoneyForm.value.provider!,
        accountName: this.mobileMoneyForm.value.accountName!,
        accountAlias: this.mobileMoneyForm.value.accountAlias!,
        phoneNumber: this.mobileMoneyForm.value.phoneNumber!,
      }

      this.mobileService.addMobileMoney(momoInfo).subscribe({
        next: () => {
          this.notyf.success('Mobile money details added successfully')
        },
        error: (error) => {
          this.notyf.error('An error occurred while adding mobile money details')
        }
      })
    }
  }


}
