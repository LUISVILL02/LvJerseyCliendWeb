import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-generic-action',
  imports: [RouterLink],
  template: `
    <button class="rounded-[20px] text-[16px] text-text-100 dark:text-text-100-dark cursor pointer transition cursor-pointer"
      [class]="padding() + ' ' + height()"
      [routerLink]="route()"
    >
      {{textContent()}}
    </button>
  `,
})
export class ButtonGenericAction {  
  textContent = input.required<string>();
  padding = input<string>('');
  height = input<string>('');
  route = input<string>('');
  
}
