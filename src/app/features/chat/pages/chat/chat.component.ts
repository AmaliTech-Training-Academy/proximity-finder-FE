import { Component } from '@angular/core';
import { HeaderComponent } from '../../../service-provider/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatListComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {}
