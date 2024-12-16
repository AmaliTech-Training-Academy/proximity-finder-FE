import { Component, Inject, OnInit } from '@angular/core';
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
import { ProfileService } from '../../../profile-management/services/profile.service';
import { ProviderData } from '../../../../core/models/ProviderData';

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
export class QuoteCreatedComponent implements OnInit{
  quotes: getQuote[] = [];
  selectedQuote: getQuote | null = null;
  showDetails: boolean = false;
  loading: boolean = true;
  searchTerm: string = '';
  filteredQuotes: getQuote[] = [];
  providerData: ProviderData | null = null;
  businessOwnerName: string = '';
  providerProfileImage: string = '';

  
  
  constructor(
    private quoteService: QuoteService,
    @Inject(NOTYF) private notyf: Notyf,
    private profileService:ProfileService
  ) {}

  ngOnInit() {
    this.loadQuotes();
    this. loadProviderProfile
  }

  loadQuotes() {
    this.quoteService.getCreatedQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.filteredQuotes = data;
        this.loading = false;
  
       
        if (this.quotes.length === 0) {
          this.notyf.error('No quotes created yet');
        } else {
          this.notyf.success('Loaded your created quotes');
        }
      },
      error: (err) => {
        this.notyf.error('Failed to load quotes');
        this.loading = false;
      },
    });
  }
  


  viewQuoteDetails(quoteId: number) {
    this.loading = true;
    this.quoteService.getSingleQuoteCreated(quoteId).subscribe({
      next: (quote) => {
        this.selectedQuote = quote;
        this.showDetails = true;
  
      
        if (quote.providerEmail) {
          this.loadProviderProfile(quote.providerEmail);
        }
  
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

  loadProviderProfile(providerEmail: string) {
    if (!providerEmail) {
      this.notyf.error('Provider email is required to fetch profile data.');
      return;
    }
  
    // Temporarily set the email in the ProfileService
    this.profileService.email = providerEmail;
  
    this.profileService.getClient().subscribe({
      next: (providerData: ProviderData) => {
        if (providerData) {
          this.businessOwnerName = providerData.businessOwnerName || '';
          this.providerProfileImage = providerData.profileImage || '';
        } else {
          this.notyf.error('Provider data not found');
        }
      },
      error: (err) => {
        console.error('Error loading provider profile:', err);
        this.notyf.error('Failed to load provider profile');
      },
    });
  }
  
}
