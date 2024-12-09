import { Component, inject, OnDestroy } from '@angular/core';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountsService } from '../../services/user-accounts.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';
import { User } from '../../models/user-response';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent implements OnDestroy {
  readonly dialog = inject(MatDialog)
  private notyf = inject(NOTYF)
  userSubscription: Subscription | null = null
  isApproved = false
  
  constructor (private userService: UserAccountsService) {}

  openDialog(){
    const dialogRef = this.dialog.open(ApprovalModalComponent, {
            data: {title: 'Account Approval',
            message: 'Are you sure you want to approve this account?',
            type: 'approve',
            confirmText: 'Approve',
            cancelText: 'Cancel'}
    })
    dialogRef.afterClosed().subscribe((results) => {
      if(results) {
        
      }
    })
  }

  rejectAccount() {
    this.userSubscription = this.userService.getUserStatus(8, 'REJECTED').subscribe({
      next: (response: User) => {
        this.notyf.success('Account status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
      },
    });
  }

  revokeAccount() {
    this.userSubscription = this.userService.getUserStatus(8, 'DEACTIVATED').subscribe({
      next: (response: User) => {
        this.notyf.success('Account status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
      }
  })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
