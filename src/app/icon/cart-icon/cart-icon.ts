import { Component, input } from '@angular/core';

@Component({
    selector: 'app-cart-icon',
    template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-text-100 transition-colors">
      <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 0V2H3L6.6 9.59L5.25 12.04C5.09 12.32 5 12.65 5 13C5 14.1 5.9 15 7 15H19V13H7.42C7.28 13 7.17 12.89 7.17 12.75L7.2 12.63L8.1 11H15.55C16.3 11 16.96 10.59 17.3 9.97L20.88 3.48C20.96 3.34 21 3.17 21 3C21 2.45 20.55 2 20 2H5.21L4.27 0H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
    </svg>
  `
})
export class CartIconComponent {
    size = input<number>(22);
}
