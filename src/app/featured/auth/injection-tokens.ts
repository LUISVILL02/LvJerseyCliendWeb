import { InjectionToken } from "@angular/core";
import { LoginWithSocial } from "./services/LogingWithSocial";

export const LOGIN_WITH_SOCIAL = new InjectionToken<LoginWithSocial>('LOGIN_WITH_SOCIAL');