import { Component } from '@angular/core';
import { ForgotPasswordComponent } from "../../components/forgot-password/forgot-password.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-forgotpassword-page',
  standalone: true,
  imports: [ForgotPasswordComponent, CommentsComponent],
  templateUrl: './forgotpassword-page.component.html',
  styleUrl: './forgotpassword-page.component.sass'
})
export class ForgotpasswordPageComponent {

}
