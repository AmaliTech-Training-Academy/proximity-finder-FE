import { Component, inject, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { HelpAndSupportService } from '../../../help-and-support/services/help-and-support.service';
import { Faq } from '../../../help-and-support/models/faqs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewFaqService } from '../../../help-and-support/services/view-faq.service';
import { Support } from '../../../help-and-support/models/clarification';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, CommonModule, DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.sass'
})
export class FaqComponent implements OnInit{
  faqs!: Observable<Faq[]>
  visible = false;
  private notyf = inject(NOTYF)

  constructor (private faqSerivce: HelpAndSupportService, private fb: FormBuilder, private viewService: ViewFaqService) {}

  supportForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  })

  ngOnInit() {
    this.faqs = this.faqSerivce.getAllFaqs()
  }

  showDialog() {
      this.visible = true;
  }

  onSubmit() {
    if(this.supportForm.valid) {
      const {email, subject, message} = this.supportForm.value

      const data: Support = {
        email: email!,
        subject: subject!,
        message: message!
      }

      this.viewService.sendSupport(data).subscribe(
        {
          next: () => {
            this.notyf.success('Support request sent successfully')
            this.supportForm.reset()
            this.visible = false
          },
          error: () => this.notyf.error('Failed to send support request')
        }
      )
    }
  }
}
