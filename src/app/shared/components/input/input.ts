import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Input),
  multi: true
};

@Component({
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styles: [`
    /* Ocultar flechitas del input number en Chrome, Safari, Edge */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Ocultar flechitas del input number en Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  `]
})
export class Input implements ControlValueAccessor {

  ref = inject(ElementRef);
  
  disable = input<boolean>();
  inputHeight = input<string>("h-[54px]")
  inputWidth = input<string>("");
  type = input.required<string>();
  placeHolder = input.required<string>();
  value = signal<string>("");

  error = input<string | null>(null);

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { }

  touched = signal<boolean>(false);
  dirty = signal<boolean>(false);

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
    this.value.set(inputElement.value);
    this.dirty.set(true);
    this.onTouched();
    this.touched.set(true);
  }

  onBlur(): void {
    this.onTouched();
    this.touched.set(true);
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onFocus(){
    this.ref.nativeElement.querySelector('input').focus();
  }
}
