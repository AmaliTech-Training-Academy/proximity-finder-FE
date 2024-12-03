import { Component } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { NavbarComponent } from "../../../user/components/navbar/navbar.component";
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';


@Component({
  selector: 'app-help-and-support',
  standalone: true,
  imports: [UserProfileHeaderComponent, NavbarComponent, AccordionModule, FormsModule, SelectButtonModule],
  templateUrl: './help-and-support.component.html',
  styleUrl: './help-and-support.component.sass'
})
export class HelpAndSupportComponent {
  stateOptions: any[] = [{ label: 'Client', value: 'client' },{ label: 'Provider', value: 'provider' }];

  value: string = 'client';
  

}
