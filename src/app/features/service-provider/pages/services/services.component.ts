import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { services } from '../../data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CommonModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.sass',
})
export class ServicesComponent {
  services = services;
}
