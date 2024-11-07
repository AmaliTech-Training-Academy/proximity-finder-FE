import { Routes } from '@angular/router';

export const routes: Routes = [
    //auth
    {
        path:'role-select',
        loadComponent: () => import ('./features/auth/pages/role/role.component').then(m => m.RoleComponent)
    },
    {
        path:'pro-signup',
        loadComponent: () => import ('./features/auth/pages/provider-signup/provider-signup.component').then(m => m.ProviderSignupComponent)
    },
    {
       path:'provider-check',
        loadComponent: () => import ('./features/auth/pages/provider/provider.component').then(m => m.ProviderComponent)
    },
    {
        path:'client-signup',
        loadComponent: () => import ('./features/auth/pages/signup/signup.component').then(m => m.SignupComponent)
    }
];
