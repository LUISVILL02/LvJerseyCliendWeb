import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputWithIcon),
  multi: true
};

@Component({
  selector: 'app-input-with-icon',
  imports: [CommonModule, ReactiveFormsModule, FaIconComponent],
  templateUrl: './input-with-icon.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputWithIcon implements ControlValueAccessor {
  disable = input<boolean>();

  inputHeight = input<string>("h-[54px]")
  inputWidth = input<string>("");
  type = input.required<string>();
  placeHolder = input.required<string>();
  iconLeft = input.required<IconDefinition>();
  iconRight = input.required<IconDefinition>();
  optionalIcon = input<IconDefinition>();

  error = input<string | null>(null);

  togglePassword = signal<boolean>(false);
  
  value = signal<string>("");
  touched = signal<boolean>(false);
  dirty = signal<boolean>(false);
  focused = signal<boolean>(false);

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
    this.value.set(inputElement.value);
    this.dirty.set(true);
    this.onTouched();
    this.touched.set(true);
  }

  onFocus(): void {
    this.focused.set(true);
  }

  onBlur(): void {
    this.focused.set(false);
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

  toggleVisibilityPassword = () => this.togglePassword.set(!this.togglePassword());
}
