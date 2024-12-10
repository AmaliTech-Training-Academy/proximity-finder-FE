import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AboutComponent } from "../../components/about/about.component";
import { PhotosComponent } from "../../components/photos/photos.component";
import { CommonModule } from '@angular/common';
import { AdminCredentialsComponent } from "../../components/admin-credentials/admin-credentials.component";
import { ProDetailsReviewComponent } from "../../components/pro-details-review/pro-details-review.component";

@Component({
  selector: 'app-admin-pro-details',
  standalone: true,
  imports: [RatingModule, FormsModule, TabMenuModule, TabViewModule, AboutComponent,
    PhotosComponent, CommonModule, AdminCredentialsComponent, ProDetailsReviewComponent],
  templateUrl: './admin-pro-details.component.html',
  styleUrl: './admin-pro-details.component.sass'
})
export class AdminProDetailsComponent {
  value: number = 5;
  status: string = 'Pending';
}
