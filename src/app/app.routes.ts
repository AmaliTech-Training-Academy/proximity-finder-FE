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
    },
    {
        path:'login',
        loadComponent: () => import ('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'forgot-password',
        loadComponent: () => import ('./features/auth/pages/forgotpassword-page/forgotpassword-page.component').then(m => m.ForgotpasswordPageComponent)
    },
    {
        path:'confirmation',
        loadComponent: () => import ('./features/auth/pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent)
    },
    {
        path:'reset-password',
        loadComponent: () => import ('./features/auth/pages/password-reset/password-reset.component').then(m => m.PasswordResetComponent)
    },
    
        
];
