import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AvailabilityFormComponent } from "../availability-form/availability-form.component";
import { DialogModule } from 'primeng/dialog';
import { ImageUploaderComponent } from '../../../../service-provider/components/image-uploader/image-uploader.component';
import { CommonModule } from '@angular/common';
import { ProDetails } from '../../../../service-discovery/models/pro-details';
import { NOTYF } from '../../../../../shared/notify/notyf.token';
import { ProviderDataService } from '../../../../service-discovery/services/provider-data.service';
import { Subscription } from 'rxjs';
import { QuoteService } from '../../../../service-provider/services/quote/quote.service';
import { callData } from '../../../../service-provider/models/callData';
import { Quote } from '../../../../service-provider/models/quoteData';
import { CallService } from '../../../../service-provider/services/call/call.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, RatingModule, AvailabilityFormComponent,DialogModule, ImageUploaderComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.sass'
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  value: number = 4;
  provider!: ProDetails;
  private notyf = inject(NOTYF)
  providerSubscription: Subscription | null = null

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

  constructor(private formBuilder:FormBuilder, private providerService: ProviderDataService,private quoteService:QuoteService,private callService:CallService){}

  
  showDialog(type: 'quote' | 'call') {
    this.modals[type] = true;
  }
  closeDialog(type: 'quote' | 'call') {
    this.modals[type] = false;
  }


  ngOnInit() {
    const storedProvider = this.providerService.getSelectedProvider();
  
    if (storedProvider) {
      this.provider = storedProvider;
    } else {
      this.providerSubscription = this.providerService.selectedProvider$.subscribe((provider) => {
        if (provider) {
          this.provider = provider;
        } else {
          this.notyf.error('Provider not found');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.providerSubscription?.unsubscribe();
  }

  onImagesChange(event: Event) {
    const input = event.target as HTMLInputElement; HTMLInputElement
    if (input?.files) {
      const fileList = input.files; 
      const files: File[] = Array.from(fileList);
      this.quoteForm.patchValue({ images: files });
    }
  }
  
  
onQuoteSubmit() {
  if (this.quoteForm.valid) {
    const { title, location, date, time, endDate, endTime, description, info, images } = this.quoteForm.value;

    
    const selectedProvider = this.providerService.getSelectedProvider();

    const email = selectedProvider ? selectedProvider.email : null;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("startDate", date);
    formData.append("startTime", time);
    formData.append("endDate", endDate);
    formData.append("endTime", endTime);
    formData.append("description", description);
    formData.append("info", info || "");
    
    if (email) {
      formData.append("email", email);
    }

    if (images) {
      for (const image of images) {
        formData.append("images", image);
      }
    }

    this.quoteService.createQuote(formData).subscribe({
      
      next: (quote: Quote) => {
        console.log(quote)
        this.notyf.success("Quote Sent Successfully");
        this.modals.quote = false;
      },
      error: (error) => {
        console.log(error)
        this.notyf.error("Failed to send quote");
      },
    });
  }
}


  onCallRequest() {
    const { phoneNumber } = this.callForm.value;
  

    const selectedProvider = this.providerService.getSelectedProvider();
  
    if (selectedProvider) {
      const { email } = selectedProvider; 
  
      const data: callData = {
        phoneNumber,
        email, 
      };
  
      this.callService.sendCallRequest(data).subscribe({
       
        next: (response) => {
          console.log(response)
          this.notyf.success("Call Request Sent Successfully");
          this.modals.call = false;
        },
        error: (error) => {
          console.log(error)
          this.notyf.error("Failed to send call request");
        },
      });
    } else {
      this.notyf.error("No provider selected");
    }

}
}
