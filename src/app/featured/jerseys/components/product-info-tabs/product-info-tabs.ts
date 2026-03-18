import { Component, signal, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarIconComponent } from '../../../../icon/star-icon/star-icon';
import { JerseyReview } from '../../models/Jersey-details';

interface ProductInfo {
    productName: string;
    articleNumber: string;
    weight: string;
    category: string;
    brand: string;
    type: string;
    season: string;
}

@Component({
    selector: 'app-product-info-tabs',
    templateUrl: './product-info-tabs.html',
    imports: [CommonModule, StarIconComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoTabsComponent {
    // Input con la información del producto
    productInfo = input.required<ProductInfo>();

    // Input con las reseñas
    reviews = input<JerseyReview[]>([]);

    // Signal para manejar la tab activa: 'description' o 'reviews'
    activeTab = signal<'description' | 'reviews'>('description');

    // Signal para controlar cuántas reseñas mostrar
    reviewsToShow = signal<number>(3);

    // Computed para obtener las reseñas visibles
    visibleReviews = computed(() => {
        return this.reviews().slice(0, this.reviewsToShow());
    });

    // Computed para saber si hay más reseñas por mostrar
    hasMoreReviews = computed(() => {
        return this.reviews().length > this.reviewsToShow();
    });

    // Método para cambiar de tab
    selectTab(tab: 'description' | 'reviews') {
        this.activeTab.set(tab);
    }

    // Método para mostrar más reseñas
    loadMoreReviews(): void {
        this.reviewsToShow.update(current => current + 3);
    }

    // Método para calcular estrellas llenas
    getFullStars(rating: number): number {
        return Math.floor(rating);
    }

    // Método para saber si tiene media estrella
    hasHalfStar(rating: number): boolean {
        return rating % 1 >= 0.5;
    }
}
