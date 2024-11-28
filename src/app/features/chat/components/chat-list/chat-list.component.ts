import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../../pages/chat/chat.component';
import { ChatItemComponent } from '../chat-item/chat-item.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    ChatItemComponent,
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.sass',
})
export class ChatListComponent {}
