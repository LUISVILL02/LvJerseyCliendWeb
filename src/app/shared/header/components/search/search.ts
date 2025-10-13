import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule],
  templateUrl: './search.html',
})
export class Search {
  readonly faSearch = faSearch;
  readonly faXmark = faXmark;

  readonly isFocused = signal(false);
  readonly searchValue = signal('');

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    // Only blur if there's no search value
    if (!this.searchValue()) {
      this.isFocused.set(false);
    }
  }

  clearSearch() {
    this.searchValue.set('');
  }
}
