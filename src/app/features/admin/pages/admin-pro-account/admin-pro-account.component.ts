import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TableModule } from 'primeng/table';
import { proAccounts } from '../../../service-provider/data';
import { AccountStatuses, statusMapping } from '../../../../utils/accountStatus';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-pro-account',
  standalone: true,
  imports: [TableModule, CommonModule, RouterLink],
  templateUrl: './admin-pro-account.component.html',
  styleUrl: './admin-pro-account.component.sass'
})
export class AdminProAccountComponent {
  proAccounts = proAccounts
  showAction: { [key: string]: boolean } = {}
  statusMapping = statusMapping

  statuses = AccountStatuses

  activeAccount: any = null; 

  constructor(private router: Router) {}

  toggleMenu(account: any) {
    this.activeAccount = this.activeAccount === account ? null : account;
  }

  toggleAction(account: any) {
    this.showAction[account.email] = !this.showAction[account.email];

    if (this.activeAccount === account) {
      this.activeAccount = null;
    }
  }

  updateStatus(account: any, status: string) {
    account.status = statusMapping[status] || status;
    this.activeAccount = null; 
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    this.activeAccount = null;
  }

}
