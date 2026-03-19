import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOption {
  value: string;
  label: string;
}

export const RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroup),
  multi: true,
};

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_GROUP_VALUE_ACCESSOR],
})
export class RadioGroup implements ControlValueAccessor {
  options = input.required<RadioOption[]>();
  name = input<string>('radio-group');

  selectedValue = signal<string>('');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  select(value: string): void {
    this.selectedValue.set(value);
    this.onChange(value);
    this.onTouched();
  }

  isSelected(value: string): boolean {
    return this.selectedValue() === value;
  }

  writeValue(value: string): void {
    this.selectedValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
