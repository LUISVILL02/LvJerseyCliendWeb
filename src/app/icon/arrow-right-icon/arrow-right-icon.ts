import { Component, input } from '@angular/core';

@Component({
  selector: 'app-arrow-right-icon',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M5.5 3L10.5 7.5L5.5 12" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
    </svg>
  `
})
export class ArrowRightIconComponent {
  size = input<number>(15);
}
