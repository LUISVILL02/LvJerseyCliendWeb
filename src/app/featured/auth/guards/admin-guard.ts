import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UserAuthentication } from '../services/user-authentication';

export const adminGuard: CanMatchFn = (): MaybeAsync<GuardResult> => {
  const route = inject(Router);
  const userAuth = inject(UserAuthentication);

  if (!userAuth.getIsLoggedInSignal()) {
    return route.createUrlTree(['/auth/login']);
  }

  return userAuth.getIsAdminSignal() ? true : route.createUrlTree(['/account/profile']);
};
