import { Component, computed, inject } from "@angular/core";
import { Navbar } from "./components/navbar";
import { Search } from "./components/search/search";
import { LoginApi } from "@src/app/featured/auth/services/login-api";
import { UserAuthentication } from "@src/app/featured/auth/services/user-authentication";

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    imports: [Navbar, Search],
})
export class Header {
    
    private authService = inject(UserAuthentication);

    isAuthenticated = computed(() => this.authService.getIsLoggedInSignal());
    isAdmin = computed(() => this.authService.getIsAdminSignal());
}