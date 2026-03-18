import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
    selector: 'app-button-with-icon',
    templateUrl: './button-with-icon.html',
})
export class ButtonWithIconComponent {
    text = input.required<string>();

    clicked = output<void>();

    handleClick(): void {
        this.clicked.emit();
    }
}
