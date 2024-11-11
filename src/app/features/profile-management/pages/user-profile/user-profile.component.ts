import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class UserProfileComponent {
  readonly dialog = inject(MatDialog)
  isFormActive = false
  isAccountClicked = false
  isDeleteModal = false

  toggleAccountDetails() {
    this.isAccountClicked = !this.isAccountClicked
  }

  openDialog(){
    const dialogComponent = this.isDeleteModal ? DeleteModalComponent : AccountDetailsComponent
    const dialogRef = this.dialog.open(dialogComponent,
      {
        data: this.isDeleteModal
          ? {
              title: 'Delete item',
              message: 'Are you sure you want to delete this account? Deleting account will remove it permanently from your linked accounts',
              type: 'delete',
              confirmText: 'Delete',
              cancelText: 'Cancel'
            }
          : {}
      }
    )
    dialogRef.afterClosed().subscribe((results) => console.log(results))
  }

  openAccountDialog() {
    this.isDeleteModal = false
    this.openDialog()
  }

  openDeleteDialog() {
    this.isDeleteModal = true
    this.openDialog()
  }
}
