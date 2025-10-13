import { Component, inject } from '@angular/core';
import { LayoutComponent } from "./shared/layout/layout";
import { ThemeService } from './shared/theme/theme';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.html',
})
export class App {
  readonly themeService = inject(ThemeService);
}
