import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
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
export class ApprovalModalComponent {
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
    },
    private userService: UserAccountsService
  ) {}
  
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  onConfirm() {
    this.userSubscription = this.userService.getUserStatus(8, 'ACTIVE').subscribe({
      next: (response: User) => {
        this.notyf.success('Account status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
      },
    });
    this.confirm.emit(true);
    this.dialogRef.close(true);
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
