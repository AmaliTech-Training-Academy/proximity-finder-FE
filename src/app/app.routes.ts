import { Routes } from '@angular/router';
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
        children: [
          {
            path: '',
            redirectTo: 'quotes', // Default child route
            pathMatch: 'full',
          },
          {
            path: 'quotes',
            loadComponent: () =>
              import(
                './features/service-provider/pages/quotes/quotes.component'
              ).then((m) => m.QuotesComponent),
          },
          {
            path: 'calls',
            loadComponent: () =>
              import(
                './features/service-provider/pages/calls/calls.component'
              ).then((m) => m.CallsComponent),
          },
        ],
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
  {
    path:'registration',
    loadComponent: () =>
      import(
        './features/pro-registration/pages/registration/registration.component'
      ).then((m) => m.RegistrationComponent),
    children: [
      {
        path: '',
        redirectTo: 'basic-info', 
        pathMatch: 'full',
      },
      {
        path:'basic-info',
        loadComponent: () =>
          import(
            './features/pro-registration/components/basic-info/basic-info.component'
          ).then((m) => m.BasicInfoComponent),
      },
      {
        path:'about-business',
        loadComponent: () =>
          import(
            './features/pro-registration/components/about-business/about-business.component'
          ).then((m) => m.AboutBusinessComponent),
      },
      {
        path:'payment-method',
        loadComponent: () =>
          import(
            './features/pro-registration/components/payment-method/payment-method.component'
          ).then((m) => m.PaymentMethodComponent),
      },
      {
        path:'service-preference',
        loadComponent: () =>
          import(
            './features/pro-registration/components/service-preference/service-preference.component'
          ).then((m) => m.ServicePreferenceComponent),
      },
      {
        path:'service-experience',
        loadComponent: () =>
          import(
            './features/pro-registration/components/service-experience/service-experience.component'
          ).then((m) => m.ServiceExperienceComponent),
      },
      {
        path:'preview',
        loadComponent: () =>
          import(
            './features/pro-registration/components/preview/preview.component'
          ).then((m) => m.PreviewComponent),
      }
      
    ]

  }
];
