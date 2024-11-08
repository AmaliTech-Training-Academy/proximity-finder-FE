import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/service-provider/pages/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './features/service-provider/layouts/dashboard-layout/dashboard-layout.component';

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
        path: 'help-support',
        loadComponent: () =>
          import(
            './features/service-provider/pages/help-support/help-support.component'
          ).then((m) => m.HelpSupportComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './features/service-provider/pages/settings/settings.component'
          ).then((m) => m.SettingsComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
