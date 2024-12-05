import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, RatingModule, AvailabilityFormComponent,DialogModule, ImageUploaderComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.sass'
})
export class ProfileDetailsComponent implements OnInit, OnDestroy{
  value: number = 4;
  private notyf = inject(NOTYF)
  providerSubscription: Subscription | null = null
  @Input() provider!: ProDetails;

  visible: boolean = false;
  modals = {
    quote: false,
    call: false
  };

  callForm:FormGroup = this.formBuilder.group({
    phoneNumber: ["",Validators.required]
  })

  quoteForm:FormGroup = this.formBuilder.group({
  name: ["",Validators.required],
   location: ["",Validators.required],
    date: ["",Validators.required],
    time: ["",Validators.required],
    endDate: ["",Validators.required],
    endTime: ["",Validators.required],
    description: ["",Validators.required],
    info: ["",],
    
  })

  constructor(private formBuilder:FormBuilder){}

  
  showDialog(type: 'quote' | 'call') {
    this.modals[type] = true;
  }
  closeDialog(type: 'quote' | 'call') {
    this.modals[type] = false;
  }


  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.providerSubscription?.unsubscribe();
  }
}
