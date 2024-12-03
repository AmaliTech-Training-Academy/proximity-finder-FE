import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bank-details-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './bank-details-form.component.html',
  styleUrl: './bank-details-form.component.sass',
})
export class BankDetailsFormComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeDialog() {
    this.closeModalEvent.emit(false);
  }
}
