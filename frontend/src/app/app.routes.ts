import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './features/customers/customer-list/customer-list.component'
          ).then((m) => m.CustomerListComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'customers/new',
        loadComponent: () =>
          import(
            './features/customers/customer-form/customer-form.component'
          ).then((m) => m.CustomerFormComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'customers/:id/edit',
        loadComponent: () =>
          import(
            './features/customers/customer-form/customer-form.component'
          ).then((m) => m.CustomerFormComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import(
            './features/accounts/account-list/account-list.component'
          ).then((m) => m.AccountListComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'operations',
        loadComponent: () =>
          import('./features/operations/operations.component').then(
            (m) => m.OperationsComponent
          ),
        canActivate: [adminGuard],
      },

      // User routes
      {
        path: 'user-dashboard',
        loadComponent: () =>
          import('./features/user-dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
      {
        path: 'user-operations',
        loadComponent: () =>
          import('./features/user-operations/user-operations.component').then(
            (m) => m.UserOperationsComponent
          ),
      },
      {
        path: 'user-accounts',
        loadComponent: () =>
          import('./features/user-dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./features/user-dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
