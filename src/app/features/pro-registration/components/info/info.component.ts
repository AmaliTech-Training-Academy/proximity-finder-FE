import { SvgService } from './../../../../shared/services/svg.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StepperComponent } from "../stepper/stepper.component";
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, StepperComponent,MatIconModule],
  templateUrl:'./info.component.html',
  styleUrl: './info.component.sass'
})
export class InfoComponent {
  currentStep = 1; 
  totalSteps = 6;

  constructor(private router: Router, SvgService:SvgService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setCurrentStep(event.urlAfterRedirects);
    });
  }

  
  private setCurrentStep(url: string): void {
    if (url.includes('/registration/basic-info')) {
      this.currentStep = 1;
    } else if (url.includes('/registration/about-business')) {
      this.currentStep = 2;
    } else if (url.includes('/registration/payment-method')) {
      this.currentStep = 3;
    } else if (url.includes('/registration/service-preference')) {
      this.currentStep = 4;
    } else if (url.includes('/registration/service-experience')) {
      this.currentStep = 5;
    } else if (url.includes('/registration/preview')) {
      this.currentStep = 6;
    }
  }

}
