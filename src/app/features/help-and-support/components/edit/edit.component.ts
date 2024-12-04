import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DialogModule,DropdownModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.sass'
})
export class EditComponent {
  visible: boolean = false;
  
  editDialog() {
    this.visible = true;
}

  onSave() {
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

}
