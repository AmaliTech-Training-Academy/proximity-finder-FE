import { MatIconModule } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';
import { SvgService } from '../../../../shared/services/svg.service';
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
  imageUrl: string = ''
  selectedFile: File | null = null

  constructor(private svgService:SvgService) { }
  openDialog(){
    const dialogRef = this.dialog.open(DeleteModalComponent, {
            data: {title: 'Remove Profile',
            message: 'Are you sure you want to remove this picture? This action cannot be undone.',
            type: 'delete',
            confirmText: 'Delete',
            cancelText: 'Cancel'}
    })
    dialogRef.afterClosed().subscribe((results) => console.log(results))
  }
  triggerFileInput(): void {
    document.getElementById('file')?.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);
    }
  }
}