import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { AvailabilityFormComponent } from "../availability-form/availability-form.component";

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [FormsModule, RatingModule, AvailabilityFormComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.sass'
})
export class ProfileDetailsComponent {
  value: number = 4;

}
