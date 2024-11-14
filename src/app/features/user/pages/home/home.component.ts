import { Component } from '@angular/core';
import { UserProfileHeaderComponent } from "../../../../shared/components/user-profile-header/user-profile-header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { TrendingServicesComponent } from "../../components/trending-services/trending-services.component";
import { CoreFeaturesComponent } from "../../components/core-features/core-features.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserProfileHeaderComponent, HeroComponent, TrendingServicesComponent, CoreFeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
