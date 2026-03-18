import { Component, input } from '@angular/core';

@Component({
    selector: 'app-minus-icon',
    template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 15 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-text-100 dark:text-text-100-dark transition-colors">
      <path d="M0 1H15" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
})
export class MinusIconComponent {
    size = input<number>(15);
}
