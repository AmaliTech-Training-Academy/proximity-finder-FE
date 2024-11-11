import { Component } from '@angular/core';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { FieldsComponent } from "../fields/fields.component";

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [ProfileUpdateComponent, FieldsComponent],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.sass'
})
export class BasicInfoComponent {

}
