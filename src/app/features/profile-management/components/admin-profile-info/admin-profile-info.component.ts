import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { IClient } from '../../../auth/models/client';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';
@Component({
  selector: 'app-admin-profile-info',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, CommonModule, FieldsComponent],
  templateUrl: './admin-profile-info.component.html',
  styleUrl: './admin-profile-info.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class AdminProfileInfoComponent implements OnInit, OnDestroy{
  readonly dialog = inject(MatDialog)
  private subscription: Subscription = new Subscription()
  private notyf = inject(NOTYF)

  isFormActive: boolean = false
  disableEmail: boolean = true
  imageUrl: string = ''
  selectedFile: File | null = null
  client!: IClient

  constructor(private fb: FormBuilder, private profileService: ProfileService) {  }

  togglEditForm(): void {
    this.isFormActive = !this.isFormActive
  }

  ngOnInit(): void {
    this.profileService.getClient().subscribe({
      next: (client) => {
        this.client = client;
        this.updateUserForm();
      },
      error: (error) => {
        console.error('Error fetching client data:', error);
      }
    });
  }
  
  

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.email],
    phone: ['', [Validators.required]]
  })

  updateUserForm() {
    this.userForm.patchValue({
      name: this.client.userName,
      email: this.client.email,
      phone: this.client.mobileNumber.toString()
    })
  }

  onSubmit() {
    if(this.userForm.valid) {
      const {name, phone} = this.userForm.value
      const updatedClient:IClient = {...this.client,
             userName: name ?? '',
             mobileNumber: parseInt(phone ?? '0',10)}

      this.profileService.updateClient(updatedClient).subscribe({
        next: (client) => {
          this.client = client
          this.updateUserForm()
          this.isFormActive = false
          this.notyf.success('Profile updated successfully')
        },
        error: (error) => {
          console.error('Error updating profile:', error)
          this.notyf.error('Error updating profile')
        }
      })
    }
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
            data: {title: 'Delete Profile',
            message: 'Are you sure you want to delete your profile? This action cannot be undone.',
            type: 'delete',
            confirmText: 'Delete',
            cancelText: 'Cancel'}
    })
    dialogRef.afterClosed().subscribe((results) => console.log(results))
  }

  triggerFileInput(): void {
    document.getElementById('file')?.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files?.length) {
      const file = fileInput.files[0]

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);
    } 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
