import { Component } from '@angular/core';
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-quote-created',
  standalone: true,
  imports: [NavbarComponent, UserProfileHeaderComponent,CommonModule,TabMenuModule,TabViewModule],
  templateUrl: './quote-created.component.html',
  styleUrl: './quote-created.component.sass'
})
export class QuoteCreatedComponent {
  showDetails: boolean = false;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

}
