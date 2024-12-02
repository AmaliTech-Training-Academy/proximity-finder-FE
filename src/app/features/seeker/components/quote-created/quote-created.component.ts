import { Component } from '@angular/core';
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";

@Component({
  selector: 'app-quote-created',
  standalone: true,
  imports: [NavbarComponent, UserProfileHeaderComponent],
  templateUrl: './quote-created.component.html',
  styleUrl: './quote-created.component.sass'
})
export class QuoteCreatedComponent {

}
