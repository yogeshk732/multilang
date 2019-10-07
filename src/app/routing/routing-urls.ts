import { Routes } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';

import { AuthGuardService as AuthGuard } from '@services/auth/auth-guard.service';
import { LoggedInAuthGuardService as LoggedInAuthGuard } from '@services/auth/loggedin-auth-guard.service';

export const routesUrl: Routes = [

  {
    path: 'login',
    loadChildren: () => import('../components/login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('@component/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [LoggedInAuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('@layout/layout.module').then(m => m.LayoutModule)
  //     }]
  // }

];

/*  Dashboard Urls */

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];
