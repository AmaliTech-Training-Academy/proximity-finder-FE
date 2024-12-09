import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { AccordionModule } from 'primeng/accordion';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ViewFaqService } from '../../services/view-faq.service';
import { Support } from '../../models/clarification';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Faqs } from '../../models/faqs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-help-and-support',
  standalone: true,
  imports: [UserProfileHeaderComponent, NavbarComponent, AccordionModule, FormsModule, SelectButtonModule,ReactiveFormsModule],
  templateUrl: './help-and-support.component.html',
  styleUrl: './help-and-support.component.sass'
})
export class HelpAndSupportComponent implements OnInit, OnDestroy {
  stateOptions: any[] = [
    { label: 'Client', value: 'seeker' },
    { label: 'Provider', value: 'provider' }
  ];

  value: string = 'seeker';  
  faqs: Faqs[] = [];
  loadFaqSub!:Subscription
  sendSub!:Subscription

  messageForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private supportService: ViewFaqService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.loadFaqs(this.value); 
  }

  loadFaqs(data: string): void {
    this.loadFaqSub=this.supportService.getFaqByGroup(data).subscribe({
      next: (response) => {
        this.faqs = response;
      },
      error: (error) => {
        console.error('Error loading FAQs', error);
        this.notyf.error('Error loading FAQs');
      }
    });
  }

  onStateChange(): void {
    this.loadFaqs(this.value);  
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      const formData: Support = this.messageForm.value;
      this.sendSub=this.supportService.sendSupport(formData).subscribe({
        next: (response) => {
          console.log('Message sent successfully', response);
          this.notyf.success('Message sent successfully');
        },
        error: (error) => {
          console.error('Error sending message', error);
          this.notyf.error('Error sending message');
        }
      });
    } else {
      console.log('Form is invalid');
      this.notyf.error('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    if(this.loadFaqSub){
      this.loadFaqSub.unsubscribe()
    }

    if(this.sendSub){
      this.sendSub.unsubscribe()
    }
   
  }
}