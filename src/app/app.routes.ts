import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/service-provider/pages/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './features/service-provider/layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'provider/dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },

      {
        path: '',
        loadComponent: () =>
          import(
            './features/service-provider/pages/dashboard-home/dashboard-home.component'
          ).then((m) => m.DashboardHomeComponent),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import(
            './features/service-provider/pages/requests/requests.component'
          ).then((m) => m.RequestsComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import(
            './features/service-provider/pages/projects/projects.component'
          ).then((m) => m.ProjectsComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import(
            './features/service-provider/pages/services/services.component'
          ).then((m) => m.ServicesComponent),
      },
      {
        path: 'scheduling',
        loadComponent: () =>
          import(
            './features/service-provider/pages/scheduling/scheduling.component'
          ).then((m) => m.SchedulingComponent),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import(
            './features/service-provider/pages/appointments/appointments.component'
          ).then((m) => m.AppointmentsComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
