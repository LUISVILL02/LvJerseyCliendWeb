import { Component, input } from '@angular/core';

@Component({
  selector: 'app-jersey-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 1.75L3.125 3.625L1.25 7.375L3.75 9.25V19.25H16.25V9.25L18.75 7.375L16.875 3.625L13.75 1.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.25 1.75C6.25 2.74456 6.64509 3.69839 7.34835 4.40165C8.05161 5.10491 9.00544 5.5 10 5.5C10.9946 5.5 11.9484 5.10491 12.6517 4.40165C13.3549 3.69839 13.75 2.74456 13.75 1.75"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class JerseyIconComponent {
  size = input<number>(20);
}
