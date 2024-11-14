import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";

@Component({
  selector: 'app-bank-details',
  standalone: true,
  imports: [FieldsComponent],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.sass'
})
export class BankDetailsComponent {

}
