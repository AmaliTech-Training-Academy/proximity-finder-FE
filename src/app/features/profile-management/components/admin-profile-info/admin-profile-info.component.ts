import { Component, inject, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { IClient } from '../../../auth/models/client';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-admin-profile-info',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, CommonModule, FieldsComponent],
  templateUrl: './admin-profile-info.component.html',
  styleUrl: './admin-profile-info.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class AdminProfileInfoComponent implements OnInit{
  readonly dialog = inject(MatDialog)

  isFormActive: boolean = false
  imageUrl: string = ''
  selectedFile: File | null = null
  client!: IClient

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  togglEditForm(): void {
    this.isFormActive = !this.isFormActive
  }

  ngOnInit(): void {
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

  updateUserForm() {
    this.userForm.patchValue({
      name: this.client.userName,
      email: this.client.email,
      phone: this.client.mobileNumber.toString()
    })
  }

  onSubmit() {
    if(this.userForm.valid) {
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
}
