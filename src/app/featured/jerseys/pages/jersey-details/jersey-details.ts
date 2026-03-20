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
import { GetJerseyById } from '../../services/get-jersey-by-id';
import { ActivatedRoute } from '@angular/router';

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
  getJerseyByIdService = inject(GetJerseyById);
  activateRouter = inject(ActivatedRoute);

  jerseyDetailSignal = computed(() => this.getJerseyByIdService.jerseyDetail());
  errorMessage = computed(() => this.getJerseyByIdService.errorResponse().message);

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

  constructor(){
    const idJersey = this.activateRouter.snapshot.paramMap.get('id');
    this.getJerseyByIdService.getJerseyByIdApi(Number(idJersey));
  }

  toggleFavorite(): void {
    const current = this.jerseyDetailSignal();
    this.getJerseyByIdService.jerseyDetail.set({
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
