import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { JerseyDetail } from '../../models/Jersey-details';
import { ButtonWithIconComponent } from '../../../../shared/components/button-with-icon/button-with-icon';
import { StarIconComponent } from '../../../../icon/star-icon/star-icon';
import { CartIconComponent } from '../../../../icon/cart-icon/cart-icon';
import { HeartIconComponent } from '../../../../icon/heart-icon/heart-icon';
import { ShareIconComponent } from '../../../../icon/share-icon/share-icon';
import { PlusIconComponent } from '../../../../icon/plus-icon/plus-icon';
import { MinusIconComponent } from '../../../../icon/minus-icon/minus-icon';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from "@src/app/shared/components/input/input";
import { ProductInfoTabsComponent } from '../../components/product-info-tabs/product-info-tabs';
import { RecommendedJerseysComponent, RecommendedJerseysData } from '../../components/recommended-jerseys/recommended-jerseys';
import { HeartFilledIconComponent } from "@src/app/icon/heart-filled-icon/heart-filled-icon";
import { UserAuthentication } from '@src/app/featured/auth/services/user-authentication';

@Component({
  selector: 'app-jersey-details',
  imports: [
    ButtonWithIconComponent,
    StarIconComponent,
    CartIconComponent,
    HeartIconComponent,
    ShareIconComponent,
    PlusIconComponent,
    MinusIconComponent,
    CurrencyPipe,
    FormsModule,
    Input,
    ProductInfoTabsComponent,
    RecommendedJerseysComponent,
    HeartFilledIconComponent
],
  templateUrl: './jersey-details.html',
})
export class JerseyDetails {

  #userAuth = inject(UserAuthentication);

  jerseyDetailSignal = signal<JerseyDetail>({
    id: 12233424,
    name: 'Camiseta Retro FC Barcelona 25/26',
    price: 110000,
    rating: 4.8,
    reviewsCount: 123,
    category: 'Liga > Club',
    brand: 'Nike',
    type: 'Retro',
    season: 'Temporada 25/26',
    weightKg: 0.2,
    tag: 'Barcelona',
    isFavorite: true,
    images: [
      '/assets/images/barcelona-front.jpg',
      '/assets/images/barcelona-back.jpg',
      '/assets/images/barcelona-detail-1.jpg',
      '/assets/images/barcelona-detail-2.jpg'
    ],
    availableSizes: [
      { code: 'S', available: true },
      { code: 'M', available: true },
      { code: 'L', available: true },
      { code: 'XL', available: false },
      { code: '2XL', available: true }
    ],
    patches: [
      { id: 1, name: 'Champions League Patch', imageUrl: '/assets/patches/ucl.png', price: 15000 },
      { id: 2, name: 'LaLiga Patch', imageUrl: '/assets/patches/laliga.png', price: 10000 },
      { id: 3, name: 'Copa del Rey Patch', imageUrl: '/assets/patches/copadelrey.png', price: 8000 }
    ], stock: 25,
    description:
      'Camiseta retro inspirada en la temporada 25/26 del FC Barcelona. Diseño clásico, materiales de alta calidad y detalles bordados que reflejan la historia del club.',
    reviews: [
      {
        id: 1,
        user: 'Usuario*****34',
        countryFlag: 'https://flagcdn.com/w40/co.png',
        overallRating: 4.8,
        date: '10 de julio de 2025',
        ratings: { quality: 4.8, delivery: 4.8, details: 4.8 },
        comments: {
          quality: 'La calidad de la camiseta es excelente muy satisfecho',
          delivery: 'La calidad de la camiseta es excelente muy satisfecho',
          details: 'La calidad de la camiseta es excelente muy satisfecho'
        },
        generalComment: 'Me ha encantado la camiseta, todo ha estado en orden y en sus tiempos establecidos.',
        images: []
      },
      {
        id: 2,
        user: 'Usuario*****78',
        countryFlag: 'https://flagcdn.com/w40/co.png',
        overallRating: 5.0,
        date: '15 de julio de 2025',
        ratings: { quality: 5.0, delivery: 5.0, details: 5.0 },
        comments: {
          quality: 'Excelente calidad, superó mis expectativas',
          delivery: 'Llegó antes de tiempo, muy bien empaquetado',
          details: 'Los detalles son perfectos, tal como en las fotos'
        },
        generalComment: 'Producto de alta calidad, totalmente recomendado.',
        images: []
      },
      {
        id: 3,
        user: 'Usuario*****92',
        countryFlag: 'https://flagcdn.com/w40/mx.png',
        overallRating: 4.5,
        date: '20 de julio de 2025',
        ratings: { quality: 4.5, delivery: 4.0, details: 5.0 },
        comments: {
          quality: 'Buena calidad por el precio',
          delivery: 'Tardó un poco más de lo esperado pero llegó bien',
          details: 'Los detalles están muy bien cuidados'
        },
        generalComment: 'Muy contento con la compra, la talla es correcta.',
        images: []
      },
      {
        id: 4,
        user: 'Usuario*****45',
        countryFlag: 'https://flagcdn.com/w40/ar.png',
        overallRating: 4.7,
        date: '25 de julio de 2025',
        ratings: { quality: 4.8, delivery: 4.5, details: 4.8 },
        comments: {
          quality: 'Material de primera calidad',
          delivery: 'Envío rápido y seguro',
          details: 'Bordados impecables'
        },
        generalComment: 'Excelente producto, volveré a comprar.',
        images: []
      },
      {
        id: 5,
        user: 'Usuario*****23',
        countryFlag: 'https://flagcdn.com/w40/es.png',
        overallRating: 4.9,
        date: '30 de julio de 2025',
        ratings: { quality: 5.0, delivery: 4.8, details: 4.9 },
        comments: {
          quality: 'Calidad premium, se nota que es original',
          delivery: 'Llegó en perfectas condiciones',
          details: 'Acabados profesionales'
        },
        generalComment: 'La mejor camiseta que he comprado online.',
        images: []
      }
    ]
  });

  selectedSize = signal<string | null>(null);
  selectedPatches = signal<number[]>([]);
  customization = signal<string>('');
  quantity = signal<number>(1);
  selectedImageIndex = signal<number>(0);
  fullStars = computed(() => Math.floor(this.jerseyDetailSignal().rating));
  hasHalfStar = computed(() => this.jerseyDetailSignal().rating % 1 >= 0.5);

  totalPrice = computed(() => {
    const basePrice = this.jerseyDetailSignal().price;
    const patchesPrice = this.selectedPatches().reduce((sum, patchId) => {
      const patch = this.jerseyDetailSignal().patches.find(p => p.id === patchId);
      return sum + (patch?.price || 0);
    }, 0);
    return (basePrice + patchesPrice) * this.quantity();
  });
  // Computed para la información del producto (para el componente de tabs)
  productInfo = computed(() => ({
    productName: this.jerseyDetailSignal().name,
    articleNumber: String(this.jerseyDetailSignal().id),
    weight: `${this.jerseyDetailSignal().weightKg}kg`,
    category: this.jerseyDetailSignal().category,
    brand: this.jerseyDetailSignal().brand,
    type: this.jerseyDetailSignal().type,
    season: this.jerseyDetailSignal().season
  }));

  isAuthenticated = computed(() => this.#userAuth.getIsLoggedInSignal());
  isAdmin = computed(() => this.#userAuth.getIsAdminSignal());

  toggleFavorite(): void {
    const current = this.jerseyDetailSignal();
    this.jerseyDetailSignal.set({
      ...current,
      isFavorite: !current.isFavorite
    });
  }

  // Signal con datos de camisetas recomendadas
  recommendedJerseys = signal<RecommendedJerseysData>({
    title: 'Camisetas relacionadas',
    jerseys: [
      {
        id: 101,
        imageUrl: '',
        name: 'Camiseta Local Real Madrid 23/24',
        typeDescription: 'Versión jugador',
        price: 100000,
        rating: 4.1,
        isFavorite: false
      },
      {
        id: 102,
        imageUrl: '',
        name: 'Camiseta Visitante Barcelona 23/24',
        typeDescription: 'Versión jugador',
        price: 105000,
        rating: 4.3,
        isFavorite: false
      },
      {
        id: 103,
        imageUrl: '',
        name: 'Camiseta Alternativa Atletico 23/24',
        typeDescription: 'Versión jugador',
        price: 95000,
        rating: 4.0,
        isFavorite: true
      }
    ]
  });

  selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  togglePatch(patchId: number): void {
    const current = this.selectedPatches();
    if (current.includes(patchId)) {
      this.selectedPatches.set(current.filter(id => id !== patchId));
    } else {
      this.selectedPatches.set([...current, patchId]);
    }
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  addToCart(): void {
    console.log('Agregar al carrito', {
      jersey: this.jerseyDetailSignal(),
      size: this.selectedSize(),
      patches: this.selectedPatches(),
      customization: this.customization(),
      quantity: this.quantity(),
      totalPrice: this.totalPrice()
    });
  }

  addToFavorites(): void {
    this.toggleFavorite();
  }

  share(): void {
    console.log('Compartir producto');
  }
}
