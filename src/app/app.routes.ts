import { Routes } from '@angular/router';
import { autNothGuard } from './featured/auth/guards/auth-guard';

interface CommonRoutes {
    HOME: string;
    AUTH: {
        BASE: string;
        LOGIN: string;
        REGISTER: string;
        EMAILVERIFICATION: string;
    }
}

export const commonRoutes: CommonRoutes = {
    HOME: '',
    AUTH: {
        BASE: 'auth',
        LOGIN: 'login',
        REGISTER: 'register',
        EMAILVERIFICATION: 'email-verification'
    }
}

export const routes: Routes = [
    {
        path: commonRoutes.AUTH.BASE,
        canMatch: [autNothGuard],
        loadChildren: () => import('./featured/auth/auth.routes').then(m => m.authRoutes)
    }, 
    {
        path: commonRoutes.HOME,
        pathMatch: 'full',
        loadComponent: () => import('./featured/home/pages/home-page/home-page').then(m => m.HomePage),
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
