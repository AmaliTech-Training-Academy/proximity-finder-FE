import { Component, HostListener, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { AccountStatuses, statusMapping } from '../../../../utils/accountStatus';
import { User, UserResponse } from '../../models/user-response';
import { UserAccountsService } from '../../services/user-accounts.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user-accounts',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-user-accounts.component.html',
  styleUrl: './admin-user-accounts.component.sass'
})
export class AdminUserAccountsComponent {
  private notyf = inject(NOTYF)
  activeAccount: User | null = null
  currentPage = 1
  pageSize = 10
  allUsers: User[] = []
  userSubscription: Subscription | null = null
  statuses = AccountStatuses
  statusMapping = statusMapping


  constructor(private userService: UserAccountsService) {}

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers('ROLE_SEEKER', this.currentPage, this.pageSize).subscribe({
      next: (response: UserResponse) => {
        if (response && response.data) {
          this.allUsers = response.data;
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


  updateStatus(account: any, status: string) {
    account.status = statusMapping[status] || status;
    this.activeAccount = null; 
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    this.activeAccount = null;
  }
  

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }
}
