import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../../profile-management/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-approval-modal',
  standalone: true,
  imports: [],
  templateUrl: './approval-modal.component.html',
  styleUrl: './approval-modal.component.sass'
})
export class ApprovalModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ApprovalModalComponent>,
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
