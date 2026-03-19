import { Routes } from '@angular/router';
import { adminGuard } from '@app/featured/auth/guards/admin-guard';

export const accountRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/account-layout/account-layout').then((m) => m.AccountLayout),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then((m) => m.ProfilePage),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders').then((m) => m.OrdersPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites/favorites').then((m) => m.FavoritesPage),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./pages/reviews/reviews').then((m) => m.ReviewsPage),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardPage),
        canMatch: [adminGuard],
      },
      {
        path: 'jerseys/create',
        loadComponent: () =>
          import('./pages/create-jersey/create-jersey').then((m) => m.CreateJerseyPage),
        canMatch: [adminGuard],
      },
    ],
  },
];
