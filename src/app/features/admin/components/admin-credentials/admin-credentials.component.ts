import { Component, Input } from '@angular/core';
import { ProviderResponse } from '../../../../core/models/provider-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-credentials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-credentials.component.html',
  styleUrl: './admin-credentials.component.sass'
})
export class AdminCredentialsComponent {
  @Input() provider!: ProviderResponse
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  }
  
}
