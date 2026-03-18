import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-list',
  imports: [FaIconComponent],
  templateUrl: './category-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList {
  categories = input<Category[]>([]);
  tittleCategory = input<string>('Categorias');
  isMenuOpen = signal(false);

  // FontAwesome icon
  faChevronDown = faChevronDown;

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
