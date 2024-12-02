import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { quotes } from '../../../service-provider/data';

@Component({
  selector: 'app-admin-pro-account',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-pro-account.component.html',
  styleUrl: './admin-pro-account.component.sass'
})
export class AdminProAccountComponent {
  quotes = quotes
}
