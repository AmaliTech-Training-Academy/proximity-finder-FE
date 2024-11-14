import { Component, inject } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
@Component({
  selector: 'app-admin-profile-info',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, ReactiveFormsModule, CommonModule, FieldsComponent],
  templateUrl: './admin-profile-info.component.html',
  styleUrl: './admin-profile-info.component.sass',
  providers: [provideNativeDateAdapter()]
})
export class AdminProfileInfoComponent {
  readonly dialog = inject(MatDialog)

  isFormActive: boolean = false
  imageUrl: string = ''
  selectedFile: File | null = null

  constructor(private fb: FormBuilder) { }

  togglEditForm(): void {
    this.isFormActive = !this.isFormActive
  }

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]]
  })

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
