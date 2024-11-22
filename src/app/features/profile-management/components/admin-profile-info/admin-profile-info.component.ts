import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { ImageManagementService } from '../../services/image-management.service';
import { SvgService } from '../../../../shared/services/svg.service';
import { IProfile } from '../../models/profile';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { decodeToken } from '../../../../utils/decodeToken';
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

  profileSubscription!: Subscription
  imageSubscription!: Subscription

  isFormActive: boolean = false
  disableEmail: boolean = true
  client!: IProfile
  imageUrl: string | ArrayBuffer | null = null
  selectedFile: File | Blob | undefined
  defaultImage = 'assets/images/default-avatar.png'
  isUploading = false
  token!: string
  role: string[] = []

  constructor(private fb: FormBuilder, private profileService: ProfileService, private imageService: ImageManagementService,
              private svgService: SvgService, private localStorageService: LocalStorageService
  ) {}

  initializeUser() {
    this.token = this.localStorageService.getItem('accessToken') || ''
    const decodedUser = decodeToken(this.token)
    if(decodedUser) {
      this.role = decodedUser.role
    }
    else {
      console.error('Failed to decode token')
    }
  }

  togglEditForm(): void {
    this.isFormActive = !this.isFormActive
  }

  ngOnInit(): void {
    if(this.role[0] === 'ROLE_ADMIN') {
      this.profileSubscription = this.profileService.getClient().subscribe({
        next: (client) => {
          this.client = client;
          console.log(client)
          this.updateUserForm();
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        }
      });
    }
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
      phone: this.client.mobileNumber?.toString() || ''
    })
  }

  onSubmit() {
    if(this.userForm.valid) {
      const {name, phone} = this.userForm.value
      const updatedClient:IProfile = {...this.client,
             userName: name || '',
             mobileNumber: phone || ''}

      this.profileService.updateClient(updatedClient).subscribe({
        next: (client) => {
          this.client = client
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
    dialogRef.afterClosed().subscribe((results) => {
      if(results) {
        this.deleteProfileImage()
      }
    })
  }

  triggerFileInput(): void {
    document.getElementById('file')?.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      const file = fileInput.files[0];

      if (!file.type.startsWith('image/')) {
        this.notyf.error('Please select a valid image file.');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  }

  updateProfileImage() {
    this.isUploading = true
    this.imageSubscription = this.imageService.uploadProfileImage(this.selectedFile).subscribe({
      next: (response) => {
        this.imageUrl = response
        this.isUploading = false
      },
      error: (error) => {
        console.error(error)
        this.isUploading = false
      }
    })
  }

  deleteProfileImage() {
    this.imageService.deleteProfileImage().subscribe({
      next: () => {
        this.client.profileImage = '';
        this.notyf.success('Profile image deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting profile image:', error);
        this.notyf.error('Error deleting profile image');
      },
    });
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
    this.imageSubscription.unsubscribe()
  }
}
