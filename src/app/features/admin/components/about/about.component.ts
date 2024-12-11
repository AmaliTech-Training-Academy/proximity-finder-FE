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

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent implements OnDestroy {
  readonly dialog = inject(MatDialog)
  private notyf = inject(NOTYF)
  userSubscription: Subscription | null = null
  isApproved = false
  visible: boolean = false;

  
  constructor (private userService: UserAccountsService, private fb: FormBuilder) {}

  messageForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
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

  showDialog() {
    this.visible = true
  }

  onSubmit() {
    if (this.messageForm.valid) {
      console.log('Form submitted', this.messageForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
