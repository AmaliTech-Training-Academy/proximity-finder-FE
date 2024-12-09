import { Component, inject } from '@angular/core';
import { PreviewService } from '../../../../core/services/preview.service';
import { Observable, catchError, EMPTY } from 'rxjs';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.sass'
})
export class PreviewComponent {
  providerInfo$!: Observable<ProviderResponse>
  private notyf = inject(NOTYF)


   constructor(private previewService:PreviewService){}

   ngOnInit(): void {
    console.log(this.providerInfo$);
    const email = 'a@mail.com'; // Replace this with the actual email dynamically
    this.providerInfo$ = this.previewService.getPreview(email).pipe(
      catchError((error) => {
        this.notyf.error('Failed to load preview data.');
        return EMPTY;
      })
    );
  }
}
