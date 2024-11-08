import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { quotes } from '../../data';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass',
})
export class QuotesComponent {
  quotes = quotes;
}
