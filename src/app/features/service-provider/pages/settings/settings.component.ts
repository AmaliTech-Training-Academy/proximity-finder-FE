import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ProBasicInfoComponent } from '../../components/pro-basic-info/pro-basic-info.component';
import { ProAboutBusinessComponent } from '../../components/pro-about-business/pro-about-business.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabViewModule, ProBasicInfoComponent, ProAboutBusinessComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.sass',
})
export class SettingsComponent {}
