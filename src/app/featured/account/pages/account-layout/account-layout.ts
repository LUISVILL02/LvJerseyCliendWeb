import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountSidebar } from '../../components/account-sidebar/account-sidebar';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AccountSidebar],
})
export class AccountLayout {}
