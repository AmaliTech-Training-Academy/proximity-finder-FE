import { Component } from '@angular/core';
import { ProInfoCardComponent } from "../../../../shared/components/pro-info-card/pro-info-card.component";

@Component({
  selector: 'app-pro-search',
  standalone: true,
  imports: [ProInfoCardComponent],
  templateUrl: './pro-search.component.html',
  styleUrl: './pro-search.component.sass'
})
export class ProSearchComponent {

}
