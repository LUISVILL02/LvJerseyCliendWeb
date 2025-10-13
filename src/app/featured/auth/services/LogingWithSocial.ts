import { Signal } from "@angular/core";
import { UserInfoBackend } from "../model/socialModels";

export interface LoginWithSocial {
    loading: Signal<boolean>;
    errorResponse: Signal<{error: boolean; message: string}>;
    loginSocial(): void;
    loginSocialBakend(userInfo: UserInfoBackend): void;
}