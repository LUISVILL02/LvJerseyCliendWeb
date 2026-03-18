import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPage {}
