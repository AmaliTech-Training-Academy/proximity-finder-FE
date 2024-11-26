import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './features/service-provider/layouts/dashboard-layout/dashboard-layout.component';
import { AdminDashboardLayoutComponent } from './features/admin/layouts/admin-dashboard-layout/admin-dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'role-select',
    loadComponent: () =>
      import('./features/auth/pages/role/role.component').then(
        (m) => m.RoleComponent
      ),
  },
  {
    path: 'pro-signup',
    loadComponent: () =>
      import(
        './features/auth/pages/provider-signup/provider-signup.component'
      ).then((m) => m.ProviderSignupComponent),
  },
  {
    path: 'provider-check',
    loadComponent: () =>
      import('./features/auth/pages/provider/provider.component').then(
        (m) => m.ProviderComponent
      ),
  },
  {
    path: 'client-signup',
    loadComponent: () =>
      import('./features/auth/pages/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        './features/auth/pages/forgotpassword-page/forgotpassword-page.component'
      ).then((m) => m.ForgotpasswordPageComponent),
  },
  {
    path: 'confirmation',
    loadComponent: () =>
      import(
        './features/auth/pages/email-verification/email-verification.component'
      ).then((m) => m.EmailVerificationComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import(
        './features/auth/pages/password-reset/password-reset.component'
      ).then((m) => m.PasswordResetComponent),
  },
  {
    path: 'verification',
    loadComponent: () =>
      import(
        './features/auth/pages/email-verification/email-verification.component'
      ).then((m) => m.EmailVerificationComponent),
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
        children: [
          {
            path: '',
            redirectTo: 'quotes',
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
    path: 'admin/dashboard',
    component: AdminDashboardLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/admin/pages/admin-dashboard-home/admin-dashboard-home.component'
          ).then((m) => m.AdminDashboardHomeComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './features/admin/pages/admin-settings/admin-settings.component'
          ).then((m) => m.AdminSettingsComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },

      {
        path: 'profile',
        loadComponent: () => import('./features/profile-management/pages/admin-profile/admin-profile.component').then((m) => m.AdminProfileComponent),
      }
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./features/user/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  {
    path: 'profile',
    loadComponent: () =>
      import(
        './features/profile-management/pages/user-profile/user-profile.component'
      ).then((m) => m.UserProfileComponent),
  },

  {path: 'pro',
    loadComponent: () => import(
      './features/user/pages/provider-details/provider-details.component'
    ).then((m) => m.ProviderDetailsComponent),
  },

  {
    path: 'registration',
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
        path: 'basic-info',
        loadComponent: () =>
          import(
            './features/pro-registration/components/basic-info/basic-info.component'
          ).then((m) => m.BasicInfoComponent),
      },
      {
        path: 'about-business',
        loadComponent: () =>
          import(
            './features/pro-registration/components/about-business/about-business.component'
          ).then((m) => m.AboutBusinessComponent),
      },
      {
        path: 'payment-method',
        loadComponent: () =>
          import(
            './features/pro-registration/components/payment-method/payment-method.component'
          ).then((m) => m.PaymentMethodComponent),
      },
      {
        path: 'service-preference',
        loadComponent: () =>
          import(
            './features/pro-registration/components/service-preference/service-preference.component'
          ).then((m) => m.ServicePreferenceComponent),
      },
      {
        path: 'service-experience',
        loadComponent: () =>
          import(
            './features/pro-registration/components/service-experience/service-experience.component'
          ).then((m) => m.ServiceExperienceComponent),
      },
      {
        path: 'preview',
        loadComponent: () =>
          import(
            './features/pro-registration/components/preview/preview.component'
          ).then((m) => m.PreviewComponent),
      },
    ],
  },
];
