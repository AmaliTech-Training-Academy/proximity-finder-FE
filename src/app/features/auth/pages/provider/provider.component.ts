import { Component } from '@angular/core';
import { CommentsComponent } from "../../components/comments/comments.component";
import { ProviderCheckComponent } from "../../components/provider-check/provider-check.component";

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [CommentsComponent, ProviderCheckComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.sass'
})
export class ProviderComponent {

}
