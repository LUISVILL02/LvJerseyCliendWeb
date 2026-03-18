import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID, REQUEST } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class SsrCookieService {
    #cookieService = inject(CookieService);
    platformId = inject(PLATFORM_ID);
    request = inject(REQUEST);

    getCookie(name: string): string {
        if (isPlatformBrowser(this.platformId)) {
            console.log('Cookie from browser:', this.#cookieService.get(name));
            return this.#cookieService.get(name);
        }
        const raw = this.request?.headers.get('cookie');
        return raw?.split('; ')
        .find(c => c.startsWith(name + '='))
        ?.split('=')[1] ?? '';
    }

    setCookie(name: string, value: string, days = 365) {
        if (isPlatformBrowser(this.platformId)) {
        this.#cookieService.set(name, value, days, '/');
        }
    }

    removeCookie(name: string) {
        if (isPlatformBrowser(this.platformId)) {
        this.#cookieService.delete(name, '/');
        }
    }
}