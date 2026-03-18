import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserIconComponent } from '@app/icon/user-icon/user-icon';
import { OrdersIconComponent } from '@app/icon/orders-icon/orders-icon';
import { HeartIconComponent } from '@app/icon/heart-icon/heart-icon';
import { StarIconComponent } from '@app/icon/star-icon/star-icon';
import { LogoutIconComponent } from '@app/icon/logout-icon/logout-icon';
import { ArrowRightIconComponent } from '@app/icon/arrow-right-icon/arrow-right-icon';
import { UserAuthentication } from '@app/featured/auth/services/user-authentication';

interface NavItem {
  label: string;
  route: string;
  icon: 'user' | 'orders' | 'heart' | 'star' | 'logout';
  showArrow: boolean;
  isAction?: boolean;
}

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    UserIconComponent,
    OrdersIconComponent,
    HeartIconComponent,
    StarIconComponent,
    LogoutIconComponent,
    ArrowRightIconComponent,
  ],
})
export class AccountSidebar {
  private router = inject(Router);
  private userAuth = inject(UserAuthentication);

  navItems: NavItem[] = [
    { label: 'Mi perfil', route: '/account/profile', icon: 'user', showArrow: true },
    { label: 'Mis pedidos', route: '/account/orders', icon: 'orders', showArrow: true },
    { label: 'Lista de favoritos', route: '/account/favorites', icon: 'heart', showArrow: true },
    { label: 'Mis reseñas', route: '/account/reviews', icon: 'star', showArrow: true },
    { label: 'Cerrar sesión', route: '', icon: 'logout', showArrow: false, isAction: true },
  ];

  onNavItemClick(item: NavItem): void {
    if (item.isAction && item.icon === 'logout') {
      this.logout();
    }
  }

  private logout(): void {
    this.userAuth.clearTokens();
    this.router.navigate(['/']);
  }
}
