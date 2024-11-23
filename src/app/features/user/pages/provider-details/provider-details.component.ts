import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../../service-provider/components/header/header.component";
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { ProfileDetailsComponent } from "../../provider-details/components/profile-details/profile-details.component";
import { ScheduleOverviewComponent } from "../../provider-details/components/schedule-overview/schedule-overview.component";
import { FeaturedProjectsComponent } from "../../provider-details/components/featured-projects/featured-projects.component";
import { ReviewsComponent } from "../../provider-details/components/reviews/reviews.component";

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [NavbarComponent, UserProfileHeaderComponent, ProfileDetailsComponent, ScheduleOverviewComponent, FeaturedProjectsComponent, ReviewsComponent],
  templateUrl: './provider-details.component.html',
  styleUrl: './provider-details.component.sass'
})
export class ProviderDetailsComponent {

}
