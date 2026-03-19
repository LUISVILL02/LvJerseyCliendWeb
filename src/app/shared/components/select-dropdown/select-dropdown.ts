import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
}

export const SELECT_DROPDOWN_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectDropdown),
  multi: true,
};

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SELECT_DROPDOWN_VALUE_ACCESSOR],
})
export class SelectDropdown implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  options = input.required<SelectOption[]>();
  placeholder = input<string>('Seleccionar...');

  isOpen = signal<boolean>(false);
  selectedOption = signal<SelectOption | null>(null);

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  select(option: SelectOption): void {
    this.selectedOption.set(option);
    this.isOpen.set(false);
    this.onChange(option.value);
    this.onTouched();
  }

  getDisplayValue(): string {
    return this.selectedOption()?.label ?? this.placeholder();
  }

  writeValue(value: string | number): void {
    if (value === null || value === undefined) {
      this.selectedOption.set(null);
      return;
    }
    const option = this.options().find((opt) => opt.value === value);
    this.selectedOption.set(option ?? null);
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
