import { Component, inject, input } from "@angular/core";
import { faCartShopping, faHeart, faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { ThemeService } from "../../theme/theme";
import { ButtonGenericAction } from "../../components/button-generic-action/button-generic-action";
import { commonRoutes } from "@src/app/app.routes";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.html',
    imports: [FaIconComponent, ButtonGenericAction, RouterLink],
})
export class Navbar {

    faHeart = faHeart;
    faCartShopping = faCartShopping;
    faUser = faUser;
    faSun = faSun;
    faMoon = faMoon;

    themeService = inject(ThemeService);

    isAuthneticated = input<boolean>(false);

    commonRoutes = commonRoutes;
}