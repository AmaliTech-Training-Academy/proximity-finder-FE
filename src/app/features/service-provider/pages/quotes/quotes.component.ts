import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule} from '@angular/common';
import { quotes } from '../../data';
import { Router } from '@angular/router';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
})
export class QuotesComponent {
  quotes = quotes;


  constructor(private router:Router){}

  openDetails(){
   this.router.navigateByUrl('/provider/dashboard/requests/quote-detail')
  }
}
