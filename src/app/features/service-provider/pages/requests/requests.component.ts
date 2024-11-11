import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule, CommonModule, RouterLinkActive],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.sass',
})
export class RequestsComponent {
  constructor(private router: Router) {}

  routes: MenuItem[] = [
    {
      label: 'Quote Requests',
      routerLink: '/provider/dashboard/requests/quotes',
    },
    {
      label: 'Call Requests',
      routerLink: '/provider/dashboard/requests/calls',
    },
  ];
}
