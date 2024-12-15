import { Component, inject } from '@angular/core';
import { PreviewService } from '../../../../core/services/preview.service';
import { Observable, catchError, EMPTY, tap } from 'rxjs';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { UserAccountsService } from '../../../admin/services/user-accounts.service';
import { Router } from '@angular/router';



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
    private userAccountsService:UserAccountsService,
    private router:Router
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
              return EMPTY;
            })
          );
        }
      },
      
    });
  }

  onRegister(): void {
    this.providerInfo$.subscribe({
      next: (providerInfo) => {
        const userId = providerInfo?.authservice?.userId; 
        if (userId) {
          const newStatus = 'submitted'; 
          this.userAccountsService.getUserStatus(userId, newStatus).subscribe({
            next: () => {
              this.showSuccessMessage = true;
              this.notyf.success('Registeration has been sent for aprroval');
              this.router.navigateByUrl('/provider/dashboard')
            },
            error: (err) => {
              this.notyf.error('Failed to send registration for approval');
            },
          });
        } 
      },
    });
  }
  
  
  
}
