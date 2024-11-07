import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { CommentsComponent } from "../../components/comments/comments.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, CommentsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent {

}
