import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mobile-money-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './mobile-money-form.component.html',
  styleUrl: './mobile-money-form.component.sass',
})
export class MobileMoneyFormComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeDialog() {
    this.closeModalEvent.emit(false);
  }
}
