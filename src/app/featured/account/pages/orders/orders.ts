import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPage {}
