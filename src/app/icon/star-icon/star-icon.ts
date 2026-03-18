import { Component, input } from '@angular/core';

@Component({
    selector: 'app-star-icon',
    template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-colors">
      <path 
        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" 
        [class]="filled() ? 'fill-primary-300 dark:fill-primary-300' : 'fill-bg-300 dark:fill-bg-300-dark'"/>
    </svg>
  `
})
export class StarIconComponent {
    size = input<number>(20);
    filled = input<boolean>(true);
}
