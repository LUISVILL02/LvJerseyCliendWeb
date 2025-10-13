import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { UserAuthentication } from '../services/user-authentication';

export const authGuard: CanMatchFn = (): MaybeAsync<GuardResult> => {
  const route = inject(Router);
  return inject(UserAuthentication).getIsLoggedInSignal() ? true : route.createUrlTree(['auth/login']);
};

export const autNothGuard: CanMatchFn = (): MaybeAsync<GuardResult> => {
  const route = inject(Router);
  return inject(UserAuthentication).getIsLoggedInSignal() ? route.createUrlTree(['/']) : true;
};