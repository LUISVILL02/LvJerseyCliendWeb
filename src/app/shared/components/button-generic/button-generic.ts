import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-generic',
  imports: [],
  template: `<button [disabled]="loading() || disabled()" (click)="onClick.emit()" class="flex items-center justify-center w-full py-[20px] rounded-[20px]  
                          text-[16px] font-normal text-text-100 "
                          [class]="height() + (disabled() ? ' bg-primary-500 cursor-not-allowed hover:shadow-none' : ' cursor-pointer bg-primary-300 hover:shadow-[0_0_10px_0_#FFE662] hover:dark:text-text-100-dark hover:bg-bg-100 hover:dark:bg-bg-100-dark')">                
              @if(loading()){
                  <svg class="size-5 animate-spin text-white fill-current" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              }
              @else{<span>{{textContent()}}</span>}
            </button>`,
})
export class ButtonGeneric {

  textContent = input.required<string>();
  height = input<string>('h-[50px]');
  disabled = input<boolean>(false);

  onClick = output<void>();

  loading = input<boolean>(false);
}
