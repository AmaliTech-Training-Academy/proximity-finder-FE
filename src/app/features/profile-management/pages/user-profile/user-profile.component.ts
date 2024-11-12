import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class UserProfileComponent {
  readonly dialog = inject(MatDialog)
  isFormActive = false
  isAccountClicked = false
  isDeleteModal = false

  constructor(private fb: FormBuilder) { }

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]]
  })

  accountInfoForm = this.fb.group({
    bankName: ['', Validators.required],
    accountName: ['', Validators.required],
    accountAlias: [''],
    accountNumber: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]]
  });
  
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
