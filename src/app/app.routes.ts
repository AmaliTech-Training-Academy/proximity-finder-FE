import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'provider/dashboard',
    loadComponent: () =>
      import(
        './features/service-provider/pages/dashboard-home/dashboard-home.component'
      ).then((m) => m.DashboardHomeComponent),
  },
];
