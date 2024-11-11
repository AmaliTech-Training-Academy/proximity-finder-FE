import { Component, inject } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-profile-info',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './admin-profile-info.component.html',
  styleUrl: './admin-profile-info.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class AdminProfileInfoComponent {
  readonly dialog = inject(MatDialog)

  isFormActive: boolean = false

  togglEditForm(): void {
    this.isFormActive = !this.isFormActive
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
}