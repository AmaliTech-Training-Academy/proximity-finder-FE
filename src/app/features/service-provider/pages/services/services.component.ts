import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { services } from '../../data';
import { ServiceCreationFormComponent } from '../../components/service-creation-form/service-creation-form.component';
import { ServiceService } from '../../../../core/services/service.service';
import { Observable, take } from 'rxjs';
import {
  ProviderServiceDetails,
  ProviderServiceResponse,
} from '../../../../core/models/ProviderServiceResponse';
import { ProfileService } from '../../../profile-management/services/profile.service';
import { LoggedInUser } from '../../../../core/models/LoggedInUser';
import { UserPaymentInfo } from '../../../../core/models/UserPaymentInfo';
import { NOTYF } from '../../../../shared/notify/notyf.token';
import { Notyf } from 'notyf';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    MenuModule,
    CommonModule,
    ServiceCreationFormComponent,
    LoaderComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.sass',
})
export class ServicesComponent implements OnInit {
  services$!: Observable<ProviderServiceDetails[]>;
  loggedInuser$ = this.profileService.loggedInUser$;
  currentUser!: LoggedInUser | null;
  paymentPreference!: UserPaymentInfo;
  selectedService!: ProviderServiceDetails;

  @ViewChild('menu') menu!: Menu;

  visible: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  options = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        this.deleteService();
      },
    },
  ];

  ngOnInit(): void {
    this.loggedInuser$.subscribe({
      next: (user) => {
        this.currentUser = user;

        this.services$ = this.serviceService.getProviderServices(
          this.currentUser?.sub as string
        );
      },
      error: (err) => {
        console.error('Error fetching logged in user:', err);
      },
    });
  }

  openServiceOptions(event: any, service: ProviderServiceDetails) {
    this.selectedService = service;
    this.menu.toggle(event);
  }

  refreshServices() {
    this.services$ = this.serviceService.getProviderServices(
      this.currentUser?.sub as string
    );
  }

  deleteService() {
    this.serviceService
      .deleteProviderService(this.selectedService.id)
      .subscribe({
        next: () => {
          this.notyf.success('Service deleted successfully');
          this.refreshServices();
        },
        error: () => this.notyf.error('Failed to delete service'),
      });
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog(isVisible: boolean) {
    this.visible = isVisible;
  }
}
