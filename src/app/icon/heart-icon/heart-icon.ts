import { Component, input } from '@angular/core';

@Component({
    selector: 'app-heart-icon',
    template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-text-100 dark:text-text-100-dark transition-colors">
      <path d="M11 19L9.55 17.7051C4.4 13.1233 1 10.0803 1 6.39409C1 3.35107 3.42 1 6.5 1C8.24 1 9.91 1.79848 11 3.08861C12.09 1.79848 13.76 1 15.5 1C18.58 1 21 3.35107 21 6.39409C21 10.0803 17.6 13.1233 12.45 17.7152L11 19Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>
  `
})
export class HeartIconComponent {
    size = input<number>(22);
}
