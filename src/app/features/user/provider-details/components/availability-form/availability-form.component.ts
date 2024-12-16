import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PasswordInputComponent } from "../../../../profile-management/components/password-input/password-input.component";
import { SchedulingService } from '../../../../schedule-manager/services/scheduling.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '../../../../../utils/dateFormatter';
import { Availablity } from '../../../../schedule-manager/models/scheduler';
import { NOTYF } from '../../../../../shared/notify/notyf.token';
import { ProDetails } from '../../../../service-discovery/models/pro-details';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BookingFormComponent } from '../../../../seeker/components/booking-form/booking-form.component';

@Component({
  selector: 'app-availability-form',
  standalone: true,
  imports: [PasswordInputComponent, ReactiveFormsModule, CommonModule, ButtonModule, DialogModule, BookingFormComponent],
  templateUrl: './availability-form.component.html',
  styleUrl: './availability-form.component.sass',
})

export class AvailabilityFormComponent implements OnInit, OnDestroy {
  isProAvailable: boolean = false
  private notyf = inject(NOTYF)
  provider!: ProDetails
  providerSubscription: Subscription | null = null
  @Input() providerEmail!: string;

  visible: boolean = false;

  constructor(private schedulingService: SchedulingService, private fb: FormBuilder) {}

  availabilityForm: FormGroup = this.fb.group({
    schedulingDate: ['', Validators.required],
    estimatedHours: ['', [Validators.required, Validators.min(1)]]
  })

  ngOnInit() {
  }

  onSubmit() {
    if(this.availabilityForm.valid) {
      const {schedulingDate, estimatedHours} = this.availabilityForm.value

      const date = new Date(schedulingDate)

      if (isNaN(date.getTime())) {
        console.error('Invalid date')
        return;
      }

      const data: Availablity = {
        schedulingDate: formatDate(date),
        estimatedHours: estimatedHours,
        createdBy: this.providerEmail
      }
      this.schedulingService.checkAvailability(data).subscribe({
        next: (response) => {
          this.isProAvailable = response
          if (this.isProAvailable) {
            this.notyf.success('Provider is available')
          }
          else {
            this.notyf.error('Provider is not available')
          }
        },
        error: (error) => {
          console.error(error)
          this.notyf.error('Failed to check provider\'s availability')
          this.isProAvailable = false
        }
      })
    }
  }

  ngOnDestroy() {
    if(this.providerSubscription) {
      this.providerSubscription.unsubscribe()
    }
  }

  showDialog() {
    this.visible = true;
  }

  onCloseDialogClicked(visible: boolean) {
    this.visible = visible;
  }
}
