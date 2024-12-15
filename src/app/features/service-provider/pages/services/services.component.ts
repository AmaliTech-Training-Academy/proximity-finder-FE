import { Component, OnInit } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { services } from '../../data';
import { ServiceCreationFormComponent } from '../../components/service-creation-form/service-creation-form.component';
import { ServiceService } from '../../../../core/services/service.service';
import { Observable } from 'rxjs';
import { ProviderServiceDetails } from '../../../../core/models/ProviderServiceResponse';

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
    CommonModule,
    ServiceCreationFormComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.sass',
})
export class ServicesComponent implements OnInit {
  services$!: Observable<ProviderServiceDetails[]>;

  visible: boolean = false;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.services$ = this.serviceService.getProviderServices();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog(isVisible: boolean) {
    this.visible = isVisible;
  }
}
