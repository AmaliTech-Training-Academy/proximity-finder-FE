import { Routes } from '@angular/router';
import { AdminProfileComponent } from './features/profile-management/pages/admin-profile/admin-profile.component';

export const routes: Routes = [
    // profile management
    {path: 'profile',
        loadComponent: () => import('./features/profile-management/pages/admin-profile/admin-profile.component').then((m)=> m.AdminProfileComponent)
    }
];
