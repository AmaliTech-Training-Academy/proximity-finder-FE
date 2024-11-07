import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.sass'
})
export class DeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      type: string;
      confirmText: string;
      cancelText: string;
    },
  ) {}
  
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  onConfirm() {
    this.confirm.emit(true);
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
    this.cancel.emit();
  }

}
