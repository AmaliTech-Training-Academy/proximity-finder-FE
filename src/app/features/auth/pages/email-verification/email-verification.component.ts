import { Component } from '@angular/core';
import { CommentsComponent } from "../../components/comments/comments.component";
import { ConfirmationComponent } from "../../components/confirmation/confirmation.component";

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommentsComponent, ConfirmationComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.sass'
})
export class EmailVerificationComponent {

}
