import { Routes } from '@angular/router';
import { commonRoutes } from '@src/app/app.routes';

export const authRoutes: Routes = [
    { path: commonRoutes.AUTH.LOGIN,  loadComponent: () => import('./pages/login/login').then(m => m.Login) },
    { path: commonRoutes.AUTH.REGISTER, loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    { path: `${commonRoutes.AUTH.EMAILVERIFICATION}/:email`, loadComponent: () => import('./pages/email-verification-code/email-verification-code').then(m => m.EmailVerificationCode) },
];
