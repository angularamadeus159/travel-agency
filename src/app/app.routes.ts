import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'reservations',
        pathMatch: 'full'
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./features/dashboard/reservations/reservations.component').then(
            (m) => m.ReservationsComponent
          )
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('./features/dashboard/upload-excel/upload-excel.component').then(
            (m) => m.UploadExcelComponent
          )
      },
      {
        path: 'emails',
        loadComponent: () =>
          import('./features/dashboard/send-emails/send-emails.component').then(
            (m) => m.SendEmailsComponent
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
