import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardJersey } from '../card-jersey/card-jersey';
import { JerseyCard } from '../../models/jersey-card';

export interface RecommendedJerseysData {
    title: string;
    jerseys: JerseyCard[];
}

@Component({
    selector: 'app-recommended-jerseys',
    templateUrl: './recommended-jerseys.html',
    imports: [CommonModule, CardJersey],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendedJerseysComponent {
    // Input con el título y las camisetas recomendadas
    data = input.required<RecommendedJerseysData>();
}
