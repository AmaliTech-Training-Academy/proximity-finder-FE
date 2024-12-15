import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountsService } from '../../services/user-accounts.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';
import { User } from '../../models/user-response';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageFormComponent } from "../message-form/message-form.component";
import { ProviderResponse } from '../../../../core/models/provider-response';
import { getBusinessYears } from '../../../../utils/yearsCalculator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, MessageFormComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog)
  private notyf = inject(NOTYF)
  userSubscription: Subscription | null = null
  isApproved = false
  visible: boolean = false
  @Input() provider!: ProviderResponse
  getBusinessYears: string | undefined
  userId!: number
  userEmail: string = ''
  
  constructor (private userService: UserAccountsService) {}

  
  ngOnInit() {
    this.getInceptionDate()
  }

  getInceptionDate() {
    if(this.provider['business-info'].aboutBusinessResponse.inceptionDate){

      const inceptionDate = this.provider['business-info'].aboutBusinessResponse.inceptionDate
      this.getBusinessYears = getBusinessYears(inceptionDate)
    }
    this.getUserEmail()
  }

  getUserId() {
    if(this.provider.authservice.userId) {
      this.userId = this.provider.authservice.userId
    }
  }

  getUserEmail() {
    if(this.provider.authservice.email) {
      this.userEmail = this.provider.authservice.email
    }
  }

  openDialog(){
    this.getUserId()
    const dialogRef = this.dialog.open(ApprovalModalComponent, {
            data: {title: 'Account Approval',
            message: 'Are you sure you want to approve this account?',
            type: 'approve',
            confirmText: 'Approve',
            cancelText: 'Cancel',
            userId: this.userId,
            userEmail: this.provider.authservice.email
          }
    })
    
    dialogRef.afterClosed().subscribe((results) => {
      if(results) {
        
      }
    })
  }

  rejectAccount() {
    this.userSubscription = this.userService.getUserStatus(this.userId, 'REJECTED').subscribe({
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
    this.userSubscription = this.userService.getUserStatus(this.userId, 'DEACTIVATED').subscribe({
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
