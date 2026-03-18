import { Routes } from '@angular/router';
import { authGuard, autNothGuard } from './featured/auth/guards/auth-guard';

interface CommonRoutes {
    HOME: string;
    AUTH: {
        BASE: string;
        LOGIN: string;
        REGISTER: string;
        EMAILVERIFICATION: string;
    };
    ACCOUNT: {
        BASE: string;
        PROFILE: string;
        ORDERS: string;
        FAVORITES: string;
        REVIEWS: string;
    };
}

export const commonRoutes: CommonRoutes = {
    HOME: '',
    AUTH: {
        BASE: 'auth',
        LOGIN: 'login',
        REGISTER: 'register',
        EMAILVERIFICATION: 'email-verification'
    },
    ACCOUNT: {
        BASE: 'account',
        PROFILE: 'profile',
        ORDERS: 'orders',
        FAVORITES: 'favorites',
        REVIEWS: 'reviews'
    }
}

export const routes: Routes = [
    {
        path: commonRoutes.AUTH.BASE,
        canMatch: [autNothGuard],
        loadChildren: () => import('./featured/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: commonRoutes.ACCOUNT.BASE,
        canMatch: [authGuard],
        loadChildren: () => import('./featured/account/account.routes').then(m => m.accountRoutes)
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
