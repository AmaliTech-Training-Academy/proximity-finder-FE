import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ButtonModule,DialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.sass'
})
export class DeleteComponent {
  visible: boolean = false;
  
  deleteDialog() {
    this.visible = true;
}

  onConfirm() {
    // Perform deletion logic here
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

}
