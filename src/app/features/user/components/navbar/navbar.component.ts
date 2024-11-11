import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SvgService } from '../../../../shared/services/svg.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  currentRoute!: string

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private svgService: SvgService) {}

  ngOnInit() {
    this.updateRoute()

    this.router.events.subscribe(() => {
      this.updateRoute()
    })
  }

  private updateRoute() {
    const path = this.router.url.split('/').pop()
    this.currentRoute = path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Home'
  }
}
