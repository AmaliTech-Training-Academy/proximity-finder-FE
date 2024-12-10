import { Component, inject } from '@angular/core';
import { PreviewService } from '../../../../core/services/preview.service';
import { Observable, catchError, EMPTY } from 'rxjs';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../profile-management/services/profile.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.sass',
})
export class PreviewComponent {
  providerInfo$!: Observable<ProviderResponse>;
  private notyf = inject(NOTYF);
  loggedInUser$ = this.profileService.loggedInUser$;

  constructor(
    private previewService: PreviewService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$.subscribe({
      next: (loggedInUser) => {
        const email = loggedInUser?.sub;
        this.providerInfo$ = this.previewService.getPreview(email as string);
        this.notyf.success('Account has been sent for approval');
      },
    });

    this.providerInfo$.subscribe({
      next: (providerInfo) => console.log(providerInfo),
    });
  }
}
