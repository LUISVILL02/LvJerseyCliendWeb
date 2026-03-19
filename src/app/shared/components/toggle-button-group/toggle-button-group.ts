import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ToggleOption {
  value: string;
  label: string;
}

export const TOGGLE_BUTTON_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleButtonGroup),
  multi: true,
};

@Component({
  selector: 'app-toggle-button-group',
  templateUrl: './toggle-button-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TOGGLE_BUTTON_GROUP_VALUE_ACCESSOR],
})
export class ToggleButtonGroup implements ControlValueAccessor {
  options = input.required<ToggleOption[]>();
  multiple = input<boolean>(false);

  selectedValues = signal<string[]>([]);

  private onChange: (value: string | string[]) => void = () => {};
  private onTouched: () => void = () => {};

  select(value: string): void {
    if (this.multiple()) {
      const current = this.selectedValues();
      const index = current.indexOf(value);
      if (index === -1) {
        this.selectedValues.set([...current, value]);
      } else {
        this.selectedValues.set(current.filter((v) => v !== value));
      }
      this.onChange(this.selectedValues());
    } else {
      this.selectedValues.set([value]);
      this.onChange(value);
    }
    this.onTouched();
  }

  isSelected(value: string): boolean {
    return this.selectedValues().includes(value);
  }

  writeValue(value: string | string[]): void {
    if (value === null || value === undefined) {
      this.selectedValues.set([]);
    } else if (Array.isArray(value)) {
      this.selectedValues.set(value);
    } else {
      this.selectedValues.set([value]);
    }
  }

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
