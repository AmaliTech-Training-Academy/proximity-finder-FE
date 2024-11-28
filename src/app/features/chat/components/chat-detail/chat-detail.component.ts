import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [
    AvatarModule,
    AvatarGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './chat-detail.component.html',
  styleUrl: './chat-detail.component.sass',
})
export class ChatDetailComponent {}
