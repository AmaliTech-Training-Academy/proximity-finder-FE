import { Component, inject } from '@angular/core';
import { PreviewService } from '../../../../core/services/preview.service';
import { Observable, catchError, EMPTY, tap } from 'rxjs';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { UserAccountsService } from '../../../admin/services/user-accounts.service';



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
  showSuccessMessage = false;
  services:string[] = []
  parsedSocialMediaLinks: string[] = [];
 

  constructor(
    private previewService: PreviewService,
    private profileService: ProfileService,
    private userAccountsService:UserAccountsService
  ) {}
 
  ngOnInit(): void {
    this.providerInfo$ = EMPTY; 

    this.loggedInUser$.subscribe({
      next: (loggedInUser) => {
        const email = loggedInUser?.sub;
        if (email) {
          this.providerInfo$ = this.previewService.getPreview(email).pipe(
            tap((data) => console.log('Provider Info:', data)),
            catchError((error) => {
              console.error('Error loading provider info:', error);
              return EMPTY;
            })
          );
        } else {
         
        }
      },
      error: (err) => console.error('Error loading logged-in user:', err),
    });
  }

  onContinue(): void {
    this.showSuccessMessage = true; 
    this.notyf.success('Account has been sent for approval');
  }
}
