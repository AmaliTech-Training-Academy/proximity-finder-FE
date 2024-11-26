import { MatIconModule } from '@angular/material/icon';
import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';
import { SvgService } from '../../../../shared/services/svg.service';
import { ImageManagementService } from '../../../profile-management/services/image-management.service';
import { Subscription } from 'rxjs';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class ProfileUpdateComponent {
  readonly dialog = inject(MatDialog)
  imageUrl: string | ArrayBuffer | null = null
  selectedFile: File | Blob | undefined
  defaultImage = 'assets/images/default-avatar.png'
  isUploading = false

  imageSubscription!: Subscription

  constructor(private svgService:SvgService,  private imageService:ImageManagementService,@Inject(NOTYF) private notyf: Notyf,) { }
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
        // this.client.profileImage = '';
        this.notyf.success('Profile image deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting profile image:', error);
        this.notyf.error('Error deleting profile image');
      },
    });
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe()
  }
  
}