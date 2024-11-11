import { Component } from '@angular/core';
import { ResetPasswordComponent } from "../../components/reset-password/reset-password.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ResetPasswordComponent, CommentsComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.sass'
})
export class PasswordResetComponent {

}
