import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { UserBankService } from '../../services/user-bank.service';
import { IBank } from '../../models/bank';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BankName } from '../../models/bank-name';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-bank-details',
  standalone: true,
  imports: [FieldsComponent, CommonModule, FormsModule, DropdownModule, ReactiveFormsModule],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.sass'
})

export class BankDetailsComponent implements OnInit, OnDestroy {
  banks!: Observable<BankName[]>
  allBankNames: string[] = []
  selectedBank!: string
  private notyf = inject(NOTYF)
  bankSubscription!: Subscription

  constructor(private bankService: UserBankService, private fb: FormBuilder){}

  bankForm = this.fb.group({
    bankName: ['', Validators.required],
    accountName: ['', Validators.required],
    accountAlias: ['', Validators.required],
    accountNumber: ['', Validators.required],
  })

  ngOnInit() {
    this.bankSubscription = this.bankService.getAllBanks().subscribe(banks => {
      this.allBankNames = banks.map(bank => bank.bankName)
    })
}

  onSubmit() {
    if(this.bankForm.valid) {
      const paymentPreference = 'Bank Account'
      const bankInfo: IBank = {
        paymentPreference,
        bankName: this.bankForm.value.bankName!,
        accountNumber: this.bankForm.value.accountNumber!,
        accountName: this.bankForm.value.accountName!,
        accountAlias: this.bankForm.value.accountAlias!,
      }
      console.log(bankInfo)

      this.bankService.addBank(bankInfo).subscribe({
        next: () => {
          console.log('Bank details added successfully')
          this.notyf.success('Bank details added successfully')
        },
        error: (error) => {
          this.notyf.error('An error occurred while adding bank details')
        }
      })
    }
  }

  onCancel() {
    this.bankForm.reset()
  }

  ngOnDestroy(): void {
    this.bankSubscription.unsubscribe()
  }
}
