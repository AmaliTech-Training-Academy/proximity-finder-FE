import { Component, inject } from '@angular/core';
import { ApprovalModalComponent } from '../approval-modal/approval-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.sass'
})
export class AboutComponent {
  readonly dialog = inject(MatDialog)
  isApproved = false
  
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
}
