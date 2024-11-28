import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { calls } from '../../data';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [TableModule, CommonModule,],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.sass'
})
export class CallsComponent {
  calls = calls

  statuses = ['Pending', 'Declined', 'Scheduled']; 
  activeQuote: any = null; 

  toggleMenu(quote: any) {
    this.activeQuote = this.activeQuote === quote ? null : quote;
  }


  updateStatus(quote: any, status: string) {
    quote.status = status;
    this.activeQuote = null; 
  }
  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    this.activeQuote = null;
  }

}
