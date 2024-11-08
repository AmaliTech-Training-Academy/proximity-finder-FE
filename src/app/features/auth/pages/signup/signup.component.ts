import { Component } from '@angular/core';
import { CommentsComponent } from '../../components/comments/comments.component';
import { SignupClientComponent } from "../../components/signup-client/signup-client.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommentsComponent, SignupClientComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass',
})
export class SignupComponent {}
