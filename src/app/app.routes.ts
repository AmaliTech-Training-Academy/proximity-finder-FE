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
            loadComponent: () =>
              import('./features/service-provider/pages/request-table/request-table.component').then(m => m.RequestTableComponent)
          },
            {
              path:'quote-detail',
              loadComponent: () => 
              import('./features/service-provider/components/quote-details/quote-details.component').then(m => m.QuoteDetailsComponent)

            }
          
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
        path: 'profile',
        loadComponent: () =>
          import(
            './features/profile-management/pages/admin-profile/admin-profile.component'
          ).then((m) => m.AdminProfileComponent),
      },

      {
        path: 'manage-reviews',
        loadComponent: () =>
          import(
            './features/admin/pages/admin-reviews/admin-reviews.component'
          ).then((m) => m.AdminReviewsComponent),
      },
      {
        path: 'pro-accounts',
        loadComponent: () =>
          import(
            './features/admin/pages/pro-accounts/pro-accounts.component'
          ).then((m) => m.ProAccountsComponent),
          children: [
            {
              path: '',
              loadComponent: () =>
                import('./features/admin/pages/admin-pro-account/admin-pro-account.component').then(m => m.AdminProAccountComponent)
            },
            {
              path: 'details/:email',
              loadComponent: () =>
                import('./features/admin/pages/admin-pro-details/admin-pro-details.component').then(m => m.AdminProDetailsComponent)
            }
          ]
      },
      {
        path: 'user-accounts',
        loadComponent: () =>
          import(
            './features/admin/pages/admin-user-accounts/admin-user-accounts.component'
          ).then((m) => m.AdminUserAccountsComponent),
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

  {path: 'search',
    loadComponent: () => import(
      './features/user/pages/pro-search/pro-search.component'
    ).then((m) => m.ProSearchComponent),
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
  {
    path: 'chat',
    loadComponent: () =>
      import('./features/chat/pages/chat/chat.component').then(
        (c) => c.ChatComponent
      ),
  },
  {
    path: 'help-and-support',
    loadComponent: () =>
      import(
        './features/help-and-support/components/help-and-support/help-and-support.component'
      ).then((m) => m.HelpAndSupportComponent),
    
  },
  {
    path: 'quote',
    loadComponent: () =>
      import(
        './features/seeker/components/quote-created/quote-created.component'
      ).then((m) => m.QuoteCreatedComponent),
  }
];
