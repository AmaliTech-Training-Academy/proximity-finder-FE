
import { Component } from '@angular/core';
import { CommentsComponent } from "../../components/comments/comments.component";
import { ProviderInputComponent } from "../../components/provider-input/provider-input.component";


@Component({
  selector: 'app-provider-signup',
  standalone: true,
  imports: [CommentsComponent, ProviderInputComponent],
  templateUrl: './provider-signup.component.html',
  styleUrl: './provider-signup.component.sass'
})
export class ProviderSignupComponent {
 

}
