import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserMobileMoneyService } from '../../../profile-management/services/user-mobile-money.service';

@Component({
  selector: 'app-mobile-money-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './mobile-money-form.component.html',
  styleUrl: './mobile-money-form.component.sass',
})
export class MobileMoneyFormComponent implements OnInit {
  mobileMoneyProviders: string[] = [];
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private mobileMoneyService: UserMobileMoneyService) {}

  ngOnInit() {
    this.mobileMoneyService.getServiceProviders().subscribe({
      next: (providers) => (this.mobileMoneyProviders = providers),
      error: (error) =>
        console.error('Failed to fetch mobile money service providers', error),
    });
  }

  closeDialog() {
    this.closeModalEvent.emit(false);
  }
}
