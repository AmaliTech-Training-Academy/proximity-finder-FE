import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { UserMobileMoneyService } from '../../../profile-management/services/user-mobile-money.service';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-money-form',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
  ],
  templateUrl: './mobile-money-form.component.html',
  styleUrl: './mobile-money-form.component.sass',
})
export class MobileMoneyFormComponent implements OnInit, OnDestroy {
  mobileMoneyProviders: string[] = [];
  subscription!: Subscription;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  mobileMoneyForm: FormGroup = this.fb.group({
    serviceProvider: ['', Validators.required],
    accountName: ['', Validators.required],
    accountAlias: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
    mobileNumber: ['', [Validators.required, Validators.maxLength(13)]],
  });

  constructor(
    private mobileMoneyService: UserMobileMoneyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.mobileMoneyService
      .getServiceProviders()
      .subscribe({
        next: (providers) => (this.mobileMoneyProviders = providers),
        error: (error) =>
          console.error(
            'Failed to fetch mobile money service providers',
            error
          ),
      });
  }

  onSubmit() {
    if (this.mobileMoneyForm.valid) {
      const formValue = this.mobileMoneyForm.value;

      this.mobileMoneyService
        .addMobileMoney({
          ...formValue,
          paymentPreference: 'Mobile Money',
        })
        .subscribe({
          next: (response) => console.log(response),
          error: (error) => console.error('Could not add account', error),
        });
    } else {
      this.mobileMoneyForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
