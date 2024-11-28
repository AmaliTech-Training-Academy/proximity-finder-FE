import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [InputIconModule, IconFieldModule, InputTextModule, FormsModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.sass',
})
export class ChatListComponent {}
