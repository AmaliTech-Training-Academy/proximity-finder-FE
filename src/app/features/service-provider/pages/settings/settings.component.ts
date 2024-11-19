import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ProBasicInfoComponent } from '../../components/pro-basic-info/pro-basic-info.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TabViewModule, ProBasicInfoComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.sass',
})
export class SettingsComponent {}
