import { Component } from '@angular/core';
import { FieldsComponent } from "../../../pro-registration/components/fields/fields.component";
import { MatIconModule } from '@angular/material/icon';
import { SvgService } from '../../../../shared/services/svg.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FieldsComponent, MatIconModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.sass'
})
export class HeroComponent {

  constructor(private svgService: SvgService) {}
}
