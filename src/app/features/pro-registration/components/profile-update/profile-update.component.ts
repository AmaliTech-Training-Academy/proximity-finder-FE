import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';
@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class ProfileUpdateComponent {
  readonly dialog = inject(MatDialog)
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
}