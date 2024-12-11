import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AboutComponent } from "../../components/about/about.component";
import { PhotosComponent } from "../../components/photos/photos.component";
import { CommonModule } from '@angular/common';
import { AdminCredentialsComponent } from "../../components/admin-credentials/admin-credentials.component";
import { ProDetailsReviewComponent } from "../../components/pro-details-review/pro-details-review.component";
import { ActivatedRoute } from '@angular/router';
import { PreviewService } from '../../../../core/services/preview.service';
import { DialogModule } from 'primeng/dialog';
import { MessageFormComponent } from "../../components/message-form/message-form.component";
import { UserAccountsService } from '../../services/user-accounts.service';
import { NOTYF } from '../../../../shared/notify/notyf.token';

@Component({
  selector: 'app-admin-pro-details',
  standalone: true,
  imports: [RatingModule, FormsModule, TabMenuModule, TabViewModule, AboutComponent,
    PhotosComponent, CommonModule, AdminCredentialsComponent, ProDetailsReviewComponent,
    DialogModule, MessageFormComponent],
  templateUrl: './admin-pro-details.component.html',
  styleUrl: './admin-pro-details.component.sass'
})
export class AdminProDetailsComponent {
  value: number = 5
  status: string = 'Pending'
  email: string | null = null
  visible: boolean = false
  private notyf = inject(NOTYF)

  constructor(private activatedRoute: ActivatedRoute, private previewService: PreviewService,
    private userService: UserAccountsService
  ) { }

  ngOnInit() {
    this.email = this.activatedRoute.snapshot.paramMap.get('email')
    const email = this.email ?? ''
    this.previewService.getPreview(email).subscribe({
      next: (response) => {
        console.log('Preview fetched:', response)
      },
      error: (err) => {
        console.error('Error fetching preview:', err)
    }
  })
  }

  showDialog() {
    this.visible = true
  }

  handleFormSubmit(data: { email: string; reason: string }, actionType: '') {
    this.userService.sendMessage(data.email, data.reason).subscribe({
      next: () => {
        this.notyf.success('Message sent successfully')
        this.visible = false
      },
      error: (err) => {
        console.error('Error sending message:', err)
        this.notyf.error('Error sending message')
      }
    })
  }
}
