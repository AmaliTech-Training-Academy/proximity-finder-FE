import { Component } from '@angular/core';
import { LoginInputComponent } from "../../components/login-input/login-input.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginInputComponent, CommentsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

}
