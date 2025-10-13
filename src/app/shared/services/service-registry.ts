import { Provider } from "@angular/core";
import { LOGIN_WITH_SOCIAL } from "@src/app/featured/auth/injection-tokens";
import { AuthSocial } from "@src/app/featured/auth/services/auth-social";

export const CORE_PROVIDERS: Provider[] = [
    {provide: LOGIN_WITH_SOCIAL, useClass: AuthSocial}
]