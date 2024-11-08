import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.sass'
})
export class ConfirmationComponent {
  constructor(private router:Router){}


  
  backToLogin() {
    // Navigate back to login page
    this.router.navigate(['/login']);
  }
}
