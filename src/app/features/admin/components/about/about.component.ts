import { Component, inject, OnDestroy } from '@angular/core';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountsService } from '../../services/user-accounts.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';
import { User } from '../../models/user-response';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageFormComponent } from "../message-form/message-form.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, MessageFormComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent implements OnDestroy {
  readonly dialog = inject(MatDialog)
  private notyf = inject(NOTYF)
  userSubscription: Subscription | null = null
  isApproved = false
  visible: boolean = false

  
  constructor (private userService: UserAccountsService, private fb: FormBuilder) {}

  messageForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required]
  })


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
    this.userSubscription = this.userService.getUserStatus(6, 'REJECTED').subscribe({
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
    this.userSubscription = this.userService.getUserStatus(6, 'DEACTIVATED').subscribe({
      next: (response: User) => {
        this.notyf.success('Account status updated successfully');
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        this.notyf.error('Error updating user status');
      }
  })
  }

  showDialog() {
    this.visible = true
  }


  handleFormSubmit(data: { email: string; reason: string }, actionType: 'revoke' | 'reject') {
    this.userService.sendMessage(data.email, data.reason).subscribe({
      next: (response: User) => {
        if (actionType === 'revoke') {
          this.revokeAccount()
        } else if (actionType === 'reject') {
          this.rejectAccount()
        }
        this.notyf.success('Message sent successfully')
        this.visible = false
      },
      error: (err) => {
        console.error('Error sending message:', err)
        this.notyf.error('Error sending message')
      }
    })
  }
  

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
