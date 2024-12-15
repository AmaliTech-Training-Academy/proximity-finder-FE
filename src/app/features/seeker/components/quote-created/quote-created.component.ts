import { Component, Inject } from '@angular/core';
import { NavbarComponent } from '../../../user/components/navbar/navbar.component';
import { UserProfileHeaderComponent } from '../../../../shared/components/user-profile-header/user-profile-header.component';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { QuoteService } from '../../../service-discovery/services/quote/quote.service';
import { getQuote } from '../../../service-provider/models/quoteData';
import { ReversePipe } from '../../../../utils/reverse.pipe';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { FormsModule } from '@angular/forms';
import { SeekerBookingsComponent } from '../seeker-bookings/seeker-bookings.component';

@Component({
  selector: 'app-quote-created',
  standalone: true,
  imports: [
    UserProfileHeaderComponent,
    CommonModule,
    TabMenuModule,
    TabViewModule,
    ReversePipe,
    FormsModule,
    SeekerBookingsComponent,
    NavbarComponent
],
  templateUrl: './quote-created.component.html',
  styleUrl: './quote-created.component.sass',
})
export class QuoteCreatedComponent {
  quotes: getQuote[] = [];
  selectedQuote: getQuote | null = null;
  showDetails: boolean = false;
  loading: boolean = true;
  searchTerm: string = '';
  filteredQuotes: getQuote[] = [];

  constructor(
    private quoteService: QuoteService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit() {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getCreatedQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.notyf.success('Loaded your created quotes');
        this.filteredQuotes = data;
        this.loading = false;
      },
      error: (err) => {
        this.notyf.error('Failed to load quotes');
        this.loading = false;
      },
    });
  }

  viewQuoteDetails(quoteId: number) {
    console.log('Hey');
    this.loading = true;
    this.quoteService.getSingleQuoteCreated(quoteId).subscribe({
      next: (quote) => {
        this.selectedQuote = quote;
        this.showDetails = true;

        this.loading = false;
      },
      error: (err) => {
        this.notyf.error('Failed to load quote details');
        this.loading = false;
      },
    });
  }

  toggleDetails() {
    this.showDetails = false;
    this.selectedQuote = null;
  }

  searchQuotes() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredQuotes = this.quotes.filter((quote) =>
      quote.title.toLowerCase().includes(searchTermLower)
    );
  }
}
