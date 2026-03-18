import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M10 11.5C12.7614 11.5 15 9.26142 15 6.5C15 3.73858 12.7614 1.5 10 1.5C7.23858 1.5 5 3.73858 5 6.5C5 9.26142 7.23858 11.5 10 11.5Z" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
      <path 
        d="M1 21.5C1 17.0817 5.02944 13.5 10 13.5C14.9706 13.5 19 17.0817 19 21.5" 
        stroke="currentColor" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
    </svg>
  `
})
export class UserIconComponent {
  size = input<number>(20);
}
