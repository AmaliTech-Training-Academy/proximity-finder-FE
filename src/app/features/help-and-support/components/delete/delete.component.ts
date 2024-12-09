import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Faq } from '../../models/faqs';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [ButtonModule,DialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.sass'
})
export class DeleteComponent {
  visible: boolean = false;
  
  @Input() faqToDelete: Faq | null = null; 
  @Output() deleteConfirmed = new EventEmitter<Faq>(); 

  deleteDialog() {
    this.visible = true;
  }

  onConfirm() {
    if (this.faqToDelete) {
      this.deleteConfirmed.emit(this.faqToDelete); 
    }
    this.visible = false;
  }

  onCancel() {
    this.visible = false;
  }

}