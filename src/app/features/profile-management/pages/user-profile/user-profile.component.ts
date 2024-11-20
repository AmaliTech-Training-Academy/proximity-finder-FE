import { Component, inject, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { IClient } from '../../../auth/models/client';
import { MatIconModule } from '@angular/material/icon';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, NavbarComponent, UserProfileHeaderComponent, FieldsComponent, CommonModule, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass',
  providers: [provideNativeDateAdapter()]
})

export class UserProfileComponent implements OnInit {
  readonly dialog = inject(MatDialog)
  isFormActive = false
  isAccountClicked = false
  isDeleteModal = false
  client!: IClient
  imageUrl: string | ArrayBuffer | null = null
  selectedFile: File | null = null
  defaultImage = 'assets/images/default-avatar.png'

  private notyf = inject(NOTYF)

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getClient().subscribe((client) => {
      this.client = client
      this.updateUserForm()
    })
  }

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

  updateUserForm() {
    this.userForm.patchValue({
      name: this.client.userName,
      email: this.client.email,
      phone: this.client.mobileNumber.toString()
    })
  }
  
  toggleAccountDetails() {
    this.isAccountClicked = !this.isAccountClicked
  }

  onSubmit() {
    if (this.userForm.valid) {
      const {name, email, phone} = this.userForm.value
      const updatedClient:IClient = {...this.client,
             userName: name ?? '',
             email: email ?? '',
             mobileNumber: parseInt(phone ?? '0',10)}

      this.profileService.updateClient(updatedClient).subscribe({
        next: (client) => {
          this.client = client
          this.updateUserForm()
          this.isFormActive = false
          this.notyf.success('Profile updated successfully')
        },
        error: (error) => {
          this.notyf.error('An error occurred while updating profile')
        }
      })
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);

    }
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
