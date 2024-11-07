import { Routes } from '@angular/router';

export const routes: Routes = [
    // admin
    {
      path: 'admin',
      loadComponent: () => import('./features/admin/pages/home/home.component').then(m => m.HomeComponent),

      children: [
        // profile management
        {path: 'profile',
            loadComponent: () => import('./features/profile-management/pages/admin-profile/admin-profile.component').then((m)=> m.AdminProfileComponent)
        },

      ]
    },

    {
      path: 'provider/dashboard',
      loadComponent: () =>
        import(
          './features/service-provider/pages/dashboard-home/dashboard-home.component'
        ).then((m) => m.DashboardHomeComponent),
    },
];
