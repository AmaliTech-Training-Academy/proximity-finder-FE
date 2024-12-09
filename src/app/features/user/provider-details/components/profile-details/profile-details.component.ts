import { Component, Inject, Input } from '@angular/core';
import { FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AvailabilityFormComponent } from "../availability-form/availability-form.component";
import { DialogModule } from 'primeng/dialog';
import { ImageUploaderComponent } from '../../../../service-provider/components/image-uploader/image-uploader.component';
import { CommonModule } from '@angular/common';
import { ProviderResponse } from '../../../../../core/models/provider-response';
import { CallService } from '../../../../service-provider/services/call/call.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, RatingModule, AvailabilityFormComponent,DialogModule, ImageUploaderComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.sass'
})
export class ProfileDetailsComponent{
  value: number = 4;
  @Input() provider!: ProviderResponse;
  email = this.provider.authservice.email
  

  visible: boolean = false;
  modals = {
    quote: false,
    call: false
  };
  

  callForm:FormGroup = this.formBuilder.group({
    phoneNumber: ["",Validators.required]
  })

  quoteForm:FormGroup = this.formBuilder.group({
  title: ["",Validators.required],
   location: ["",Validators.required],
    date: ["",Validators.required],
    time: ["",Validators.required],
    endDate: ["",Validators.required],
    endTime: ["",Validators.required],
    description: ["",Validators.required],
    info: ["",],
    
  })

  constructor(private formBuilder:FormBuilder, private callService:CallService,@Inject(NOTYF) private notyf: Notyf,){}

  
  showDialog(type: 'quote' | 'call') {
    this.modals[type] = true;
  }
  closeDialog(type: 'quote' | 'call') {
    this.modals[type] = false;
  }

  onQuoteSubmit(){}

  onCallRequest() {
    if (this.callForm.valid) {
      this.callService.sendCallRequest({
        ...this.callForm.value, 
        providerEmail: this.provider.authservice.email 
      }).subscribe({
        next: () => {
          this.notyf.success('Call Request Sent Successfully');
          this.modals.call = false;
        },
        error: (error) => {
          console.error('Error sending call request:', error);
          this.notyf.error('Failed to send call request');
        }
      });
    } else {
      this.notyf.error('Please enter a valid phone number');
    }
  }
  
}
