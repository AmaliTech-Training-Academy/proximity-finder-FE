import { Component } from '@angular/core';
import { InfoComponent } from "../../components/info/info.component";
import { BasicInfoComponent } from "../../components/basic-info/basic-info.component";

@Component({
  selector: 'app-basic-info-page',
  standalone: true,
  imports: [InfoComponent, BasicInfoComponent],
  templateUrl: './basic-info-page.component.html',
  styleUrl: './basic-info-page.component.sass'
})
export class BasicInfoPageComponent {

}
