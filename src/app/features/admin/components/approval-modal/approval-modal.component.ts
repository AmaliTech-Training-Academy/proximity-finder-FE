import { Component, EventEmitter, inject, Inject, OnDestroy, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAccountsService } from '../../services/user-accounts.service';
import { User } from '../../models/user-response';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-approval-modal',
  standalone: true,
  imports: [],
  templateUrl: './approval-modal.component.html',
  styleUrl: './approval-modal.component.sass'
})
export class ApprovalModalComponent implements OnDestroy {
  private notyf = inject(NOTYF)
  userSubscription: Subscription | null = null


  constructor(
    private dialogRef: MatDialogRef<ApprovalModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      type: string;
      confirmText: string;
      cancelText: string;
      userId: number;
      userEmail: string;
    },
    private userService: UserAccountsService
  ) {}
  
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  onConfirm() {
    const email = this.data.userEmail
    const reason = 'Your account has been successfully approved and activated. You can now access all the features and services available to approved users.'
    this.userSubscription = this.userService.getUserStatus(this.data.userId, 'ACTIVE').subscribe({
      next: (response: User) => {
        this.userService.sendMessage(email, reason).subscribe()
        this.notyf.success('Account status updated successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
        this.dialogRef.close(false);

      },
    });

    this.confirm.emit(true);
  }

  onCancel() {
    this.dialogRef.close(false);
    this.cancel.emit();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
