import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { QuoteService } from '../../../service-discovery/services/quote/quote.service';
import { Request } from '../../../service-provider/models/quoteData';
import { ReversePipe } from '../../../../utils/reverse.pipe';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [TableModule, CommonModule,ReversePipe],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
})
export class QuotesComponent {
  quotes:Request[] = [];
  selectedDate: string | null = null;
  
  


  constructor(private router:Router, private quoteService:QuoteService){}

  ngOnInit() {
    this.fetchQuoteRequests();
  }

  fetchQuoteRequests() {
    this.quoteService.getQuotes().subscribe({
      next: (response) => {
        this.quotes = response.content;
      },
      error: (err) => {
        console.error('Error fetching quote requests:', err);
      },
    });
  }


  openDetails(quote: Request) {
    this.router.navigateByUrl(`/provider/dashboard/requests/quote-detail/${quote.requestId}`);
  }
  
}
