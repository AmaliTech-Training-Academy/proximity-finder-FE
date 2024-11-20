import { Component, Inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { Notyf } from 'notyf';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.sass',
})
export class ConfirmationComponent implements OnDestroy {
  email = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation?.extras.state?.['email'] || '';
  }

  resendEmail() {
    if (this.email) {
      this.forgotPasswordService.resetMail(this.email).subscribe({
        next: () => {
          this.notyf.success('Resend Email Sent Successfully');
        },
        error: () => {
          this.notyf.error('Resend Failed. Please Try Again');
        },
      });
    } else {
      this.notyf.error('Email not provided.');
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
