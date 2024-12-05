import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AccountStatuses, statusMapping } from '../../../../utils/accountStatus';
import { RouterLink } from '@angular/router';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountsService } from '../../services/user-accounts.service';
import { User, UserResponse } from '../../models/user-response';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { StatusPipe } from "../../pipes/status.pipe";

@Component({
  selector: 'app-admin-pro-account',
  standalone: true,
  imports: [TableModule, CommonModule, RouterLink, StatusPipe],
  templateUrl: './admin-pro-account.component.html',
  styleUrl: './admin-pro-account.component.sass'
})
export class AdminProAccountComponent implements OnInit, OnDestroy{
  showAction: { [key: string]: boolean } = {}
  statusMapping = statusMapping
  readonly dialog = inject(MatDialog)
  private notyf = inject(NOTYF)
  statuses = AccountStatuses
  activeAccount: User | null = null
  currentPage = 1
  pageSize = 10
  allProAccounts: User[] = []
  userSubscription: Subscription | null = null


  constructor(private userService: UserAccountsService) {}

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers('ROLE_PROVIDER', this.currentPage, this.pageSize).subscribe({
      next: (response: UserResponse) => {
        if (response && response.data) {
          this.allProAccounts = response.data;
          this.currentPage++;
        } else {
          this.notyf.error('Data not found in the response');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.notyf.error('Error fetching users');
      }
    });
  }
  

  toggleMenu(account: User) {
    this.activeAccount = this.activeAccount === account ? null : account;
  }

  toggleAction(account: User) {
    this.showAction[account.email] = !this.showAction[account.email];

    if (this.activeAccount === account) {
      this.activeAccount = null;
    }
  }
  updateStatus(account: User, status: string) {
    const backendStatus = statusMapping[status];
  
    if (!backendStatus) {
      console.error('Invalid status:', status);
      this.notyf.error('Invalid status selected');
      return;
    }
    account.status = backendStatus;
  
    this.activeAccount = null;
    
    this.userService.getUserStatus(account.userId, backendStatus).subscribe({
      next: (response: User) => {
        this.notyf.success('Account status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
      },
    });
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

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }
}
