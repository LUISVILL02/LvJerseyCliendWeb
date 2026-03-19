import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserIconComponent } from '@app/icon/user-icon/user-icon';
import { OrdersIconComponent } from '@app/icon/orders-icon/orders-icon';
import { HeartIconComponent } from '@app/icon/heart-icon/heart-icon';
import { StarIconComponent } from '@app/icon/star-icon/star-icon';
import { LogoutIconComponent } from '@app/icon/logout-icon/logout-icon';
import { ArrowRightIconComponent } from '@app/icon/arrow-right-icon/arrow-right-icon';
import { ChartIconComponent } from '@app/icon/chart-icon/chart-icon';
import { JerseyIconComponent } from '@app/icon/jersey-icon/jersey-icon';
import { UserAuthentication } from '@app/featured/auth/services/user-authentication';

interface NavItem {
  label: string;
  route: string;
  icon: 'user' | 'orders' | 'heart' | 'star' | 'logout' | 'chart' | 'jersey';
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
    ChartIconComponent,
    JerseyIconComponent,
  ],
})
export class AccountSidebar {
  private router = inject(Router);
  private userAuth = inject(UserAuthentication);

  isAdmin = computed(() => this.userAuth.getIsAdminSignal());

  // Items para usuario normal
  private userNavItems: NavItem[] = [
    { label: 'Mi perfil', route: '/account/profile', icon: 'user', showArrow: true },
    { label: 'Mis pedidos', route: '/account/orders', icon: 'orders', showArrow: true },
    { label: 'Lista de favoritos', route: '/account/favorites', icon: 'heart', showArrow: true },
    { label: 'Mis reseñas', route: '/account/reviews', icon: 'star', showArrow: true },
    { label: 'Cerrar sesión', route: '', icon: 'logout', showArrow: false, isAction: true },
  ];

  // Items para admin
  private adminNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/account/dashboard', icon: 'chart', showArrow: true },
    { label: 'Pedidos', route: '/account/orders', icon: 'orders', showArrow: true },
    { label: 'Camisetas', route: '/account/jerseys/create', icon: 'jersey', showArrow: true },
    { label: 'Cerrar sesión', route: '', icon: 'logout', showArrow: false, isAction: true },
  ];

  navItems = computed(() => (this.isAdmin() ? this.adminNavItems : this.userNavItems));

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
