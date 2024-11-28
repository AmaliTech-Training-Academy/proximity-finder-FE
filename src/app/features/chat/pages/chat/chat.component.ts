import { Component } from '@angular/core';
import { HeaderComponent } from '../../../service-provider/components/header/header.component';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';
import { ChatDetailComponent } from '../../components/chat-detail/chat-detail.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [HeaderComponent, ChatListComponent, ChatDetailComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {}
