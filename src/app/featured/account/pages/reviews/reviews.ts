import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsPage {}
