import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<'light' | 'dark'>('light');
  private readonly key = 'theme';

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.key) as 'light' | 'dark' | null;
      this.theme.set(stored ?? 'light');
    }
  }

  toggle() {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, theme);
    }
  }
}