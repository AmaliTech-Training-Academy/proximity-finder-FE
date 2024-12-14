import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { ProDetails } from '../../../features/service-discovery/models/pro-details';
import { ProviderDataService } from '../../../features/service-discovery/services/provider-data.service';
import { PreviewService } from '../../../core/services/preview.service';
import { Subscription } from 'rxjs';
import { ReviewService } from '../../../features/reviews-feedback/services/review.service';

@Component({
  selector: 'app-pro-info-card',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './pro-info-card.component.html',
  styleUrl: './pro-info-card.component.sass'
})
export class ProInfoCardComponent implements OnInit, OnDestroy {
  @Input() provider!: ProDetails
  value: number = 0
  businessName: string = ''
  businessImage: string = ''
  previewSubscription: Subscription | null = null
  defaultImage = 'assets/images/default-avatar.png'
  

  constructor(private router: Router, private providerService: ProviderDataService, private previewService: PreviewService,
  ) { }

  ngOnInit(): void {
    this.getBusinessName()
  }

  viewProfile() {
    this.router.navigate(['/pro'])
    this.providerService.setSelectedProvider(this.provider)
  }

  getBusinessName() {
    this.previewService.getClientPreview(this.provider.userEmail).subscribe((res) => {
      this.businessName = res.userName
      this.businessImage = res.profileImage
    })
  }

  ngOnDestroy() {
    if (this.previewSubscription) {
      this.previewSubscription.unsubscribe()
    }
  }
}
