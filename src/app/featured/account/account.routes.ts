import { Routes } from '@angular/router';

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
    ],
  },
];
