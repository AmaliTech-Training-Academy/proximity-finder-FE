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
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, RatingModule, AvailabilityFormComponent,DialogModule, ImageUploaderComponent, ReactiveFormsModule,CommonModule,CalendarModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.sass',
  providers: [DatePipe]
})
export class ProfileDetailsComponent{
  value: number = 4;
  @Input() provider!: ProviderResponse;
  email: string = ''
  isImageModified: boolean = false;
  time: Date[] | undefined;
  

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
    startDate: ["",Validators.required],
    startTime: ["",Validators.required],
    endDate: ["",Validators.required],
    endTime: ["",Validators.required],
    description: ["",Validators.required],
    additionalDetails: ["",],
    images:[null]
    
  })

  constructor(private formBuilder:FormBuilder, private callService:CallService,@Inject(NOTYF) private notyf: Notyf,private quoteService:QuoteService,private datePipe: DatePipe){}

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
    
     
      const formattedStartDate = this.datePipe.transform(this.quoteForm.get('startDate')?.value, 'dd/MM/yyyy');
      const formattedEndDate = this.datePipe.transform(this.quoteForm.get('endDate')?.value, 'dd/MM/yyyy');
  
      formData.append('endDate', formattedEndDate || '');      
      formData.append('startDate', formattedStartDate || '');    
      
     
    
      
      formData.append('title', this.quoteForm.get('title')?.value);
      formData.append('location', this.quoteForm.get('location')?.value);
      formData.append('startTime', this.quoteForm.get('startTime')?.value);
      formData.append('endTime', this.quoteForm.get('endTime')?.value);
      formData.append('description', this.quoteForm.get('description')?.value);
      formData.append('additionalDetails', this.quoteForm.get('additionalDetails')?.value);
  
      
      const images = this.quoteForm.get('images')?.value;
      if (images && images.length > 0) {
        images.forEach((image: File) => {
          formData.append('images', image);
        });
      }
  
      
      formData.append('assignedProvider', this.provider.authservice.email);
    
    
      this.quoteService.sendQuote(formData).subscribe({
        next: () => {
          this.notyf.success('Quote submitted successfully');
          this.modals.quote = false; 
          this.quoteForm.reset(); 
          this.isImageModified = false; 
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
  
  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  formatTime(time: string): string {
    const date = new Date(time);
    return this.datePipe.transform(date, 'HH:mm') || '';
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
