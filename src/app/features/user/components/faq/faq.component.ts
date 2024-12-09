import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { HelpAndSupportService } from '../../../help-and-support/services/help-and-support.service';
import { Faq } from '../../../help-and-support/models/faqs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.sass'
})
export class FaqComponent implements OnInit{
  faqs!: Observable<Faq[]>

  constructor (private faqSerivce: HelpAndSupportService) {}

  ngOnInit() {
    this.faqs = this.faqSerivce.getAllFaqs()
  }
}
