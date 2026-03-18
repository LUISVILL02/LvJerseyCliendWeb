import { Component, input } from '@angular/core';
import { JerseyCard } from '../../models/jersey-card';
import { CardJersey } from "../card-jersey/card-jersey";

@Component({
  selector: 'app-list-jerseys',
  imports: [CardJersey],
  templateUrl: './list-jerseys.html',
})
export class ListJerseys {
  jerseys = input<JerseyCard[]>([]);
}
