import { Component, input } from '@angular/core';

@Component({
    selector: 'app-plus-icon',
    template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-text-100 dark:text-text-100-dark transition-colors">
      <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" stroke-width="2"/>
    </svg>
  `
})
export class PlusIconComponent {
    size = input<number>(15);
}
