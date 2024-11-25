import { Component, Inject, Input } from '@angular/core';
import { ServiceCategory } from '../../../../core/models/IServiceCategory';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ServiceService } from '../../../../core/services/service.service';
import { Router } from '@angular/router';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';
import { AdminServiceCreationFormComponent } from '../admin-service-creation-form/admin-service-creation-form.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [MenuModule, AdminServiceCreationFormComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.sass',
})
export class ServiceCardComponent {
  @Input() serviceCategory!: ServiceCategory;
  visible: boolean = false;

  menuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {
        this.visible = true;
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        this.serviceService.deleteService(this.serviceCategory.id as string);
        this.notyf.success('Service has been deleted successfully');
      },
    },
  ];

  resetDialog() {
    this.visible = false;
  }

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {}
}
