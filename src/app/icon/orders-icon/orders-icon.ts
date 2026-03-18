import { Component, input } from '@angular/core';

@Component({
  selector: 'app-orders-icon',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M14.5 6.5H1.5C1.22386 6.5 1 6.72386 1 7V19.5C1 19.7761 1.22386 20 1.5 20H14.5C14.7761 20 15 19.7761 15 19.5V7C15 6.72386 14.7761 6.5 14.5 6.5Z" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
      <path 
        d="M5 6.5V4.5C5 3.70435 5.31607 2.94129 5.87868 2.37868C6.44129 1.81607 7.20435 1.5 8 1.5C8.79565 1.5 9.55871 1.81607 10.1213 2.37868C10.6839 2.94129 11 3.70435 11 4.5V6.5" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
    </svg>
  `
})
export class OrdersIconComponent {
  size = input<number>(16);
}
