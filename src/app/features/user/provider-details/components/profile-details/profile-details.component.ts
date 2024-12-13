import { Component, Inject, Input } from '@angular/core';
import { FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AvailabilityFormComponent } from "../availability-form/availability-form.component";
import { DialogModule } from 'primeng/dialog';
import { ImageUploaderComponent } from '../../../../service-provider/components/image-uploader/image-uploader.component';
import { CommonModule } from '@angular/common';
import { ProviderResponse } from '../../../../../core/models/provider-response';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../../shared/notify/notyf.token';
import { CallService } from '../../../../service-discovery/services/call/call.service';
import { QuoteService } from '../../../../service-discovery/services/quote/quote.service';

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
  email: string = ''
  isImageModified: boolean = false;
  

  visible: boolean = false;
  modals = {
    quote: false,
    call: false
  };
  
  callForm: FormGroup = this.formBuilder.group({
    phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]]
  });
  

  quoteForm:FormGroup = this.formBuilder.group({
  title: ["",Validators.required],
   location: ["",Validators.required],
    date: ["",Validators.required],
    time: ["",Validators.required],
    endDate: ["",Validators.required],
    endTime: ["",Validators.required],
    description: ["",Validators.required],
    info: ["",],
    images:[null]
    
  })

  constructor(private formBuilder:FormBuilder, private callService:CallService,@Inject(NOTYF) private notyf: Notyf,private quoteService:QuoteService){}

  ngOnInit() {
    if(this.provider.authservice){
      this.email = this.provider.authservice.email
      console.log(this.email)
    }
  }

  
  showDialog(type: 'quote' | 'call') {
    this.modals[type] = true;
  }
  closeDialog(type: 'quote' | 'call') {
    this.modals[type] = false;
  }

  resetForm() {
    this.callForm.reset();  
    this.quoteForm.reset();  
  }

  onImageUploaded(files: File[]) {
    this.isImageModified = true;
    this.quoteForm.patchValue({
      images: files,
    });
  }

  onQuoteSubmit() {
    if (this.quoteForm.valid) {
      console.log(this.quoteForm.value);
      const formData = new FormData();
  
      // Append form values to FormData
      Object.entries(this.quoteForm.value).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          // Append each file in the images array
          value.forEach((file: File, index: number) => {
            formData.append(`images[${index}]`, file);
          });
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });
  
      // Append the provider's email
      formData.append('providerEmail', this.provider.authservice.email);
  
      // Call the API to submit the form
      this.quoteService.sendQuote(formData).subscribe({
        next: () => {
          this.notyf.success('Quote submitted successfully');
          this.modals.quote = false; // Close the dialog
          this.quoteForm.reset(); // Reset the form
          this.isImageModified = false; // Reset the image modification flag
        },
        error: (error) => {
          console.error('Error submitting quote:', error);
          this.notyf.error('Failed to submit quote');
        }
      });
    } else {
      this.notyf.error('Please fill in all required fields');
    }
  }
  

  onCallRequest() {
    console.log(this.callForm.value);
    if (this.callForm.valid) {
      this.callService.sendCallRequest({
        ...this.callForm.value, 
        assignedProvider: this.provider.authservice.email 
      }).subscribe({
        next: () => {
          this.notyf.success('Call Request Sent Successfully');
          this.modals.call = false;
          this.resetForm()
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
