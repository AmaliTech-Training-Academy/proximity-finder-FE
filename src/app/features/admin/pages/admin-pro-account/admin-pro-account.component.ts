import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { proAccounts } from '../../../service-provider/data';
import { AccountStatuses, statusMapping } from '../../../../utils/accountStatus';
import { Router, RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog)

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
  
  openDialog(){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
            data: {title: 'Delete Account',
            message: 'Are you sure you want to delete this account? This action cannot be undone.',
            type: 'delete',
            confirmText: 'Delete',
            cancelText: 'Cancel'}
    })
    dialogRef.afterClosed().subscribe((results) => {
      if(results) {
        
      }
    })
  }

}
