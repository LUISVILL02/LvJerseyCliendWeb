export interface JerseyDetail {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  type: string;
  season: string;
  weightKg: number;
  tag?: string;
  images: string[];
  availableSizes: JerseySize[];
  patches: PatchOption[];
  stock: number;
  description?: string;
  isFavorite: boolean;
  reviews?: JerseyReview[];
}

export interface JerseySize {
  code: 'S' | 'M' | 'L' | 'XL' | '2XL';
  available: boolean;
}

export interface PatchOption {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface JerseyReview {
  id: number;
  user: string;
  countryFlag?: string; // URL de la bandera del país
  overallRating: number;
  date: string;
  ratings: {
    quality: number;
    delivery: number;
    details: number;
  };
  comments: {
    quality: string;
    delivery: string;
    details: string;
  };
  generalComment: string;
  images?: string[]; // URLs de imágenes adjuntas a la reseña
}

// server 

export interface JerseyDetailResponse {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  type: string;
  season: string;
  weightKg: number;
  tag?: string;
  images: string[];
  availableSizes: JerseySizeResponse[];
  patches: PatchOptionResponse[];
  stock: number;
  description?: string;
  isFavorite: boolean;
  reviews?: JerseyReviewResponse[];
}

export interface JerseySizeResponse {
  code: 'S' | 'M' | 'L' | 'XL' | '2XL';
  available: boolean;
}

export interface PatchOptionResponse {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface JerseyReviewResponse {
  id: number;
  user: string;
  countryFlag?: string; // URL de la bandera del país
  overallRating: number;
  date: string;
  ratings: {
    quality: number;
    delivery: number;
    details: number;
  };
  comments: {
    quality: string;
    delivery: string;
    details: string;
  };
  generalComment: string;
  images?: string[]; // URLs de imágenes adjuntas a la reseña
}

/**
 * Estado del producto según la elección del usuario
 */
export interface JerseySelection {
  productId: number;
  selectedSize: 'S' | 'M' | 'L' | 'XL' | '2XL';
  selectedPatches: number[]; // IDs de parches elegidos
  customization?: CustomizationInput;
  quantity: number;
  totalPrice: number;
}

export interface CustomizationInput {
  name?: string;
  number?: number;
  font?: string;
}


export const jerseyDetailsMock: JerseyDetail = {
    id: 0,
    name: 'NA',
    price: 0,
    rating: 0,
    reviewsCount: 0,
    category: 'NA',
    brand: 'NA',
    type: 'NA',
    season: 'NA',
    weightKg: 0,
    tag: 'NA',
    isFavorite: false,
    images: [],
    availableSizes: [
      { code: 'S', available: false },
      { code: 'M', available: false },
      { code: 'L', available: false },
      { code: 'XL', available: false },
      { code: '2XL', available: false }
    ],
    patches: [
      { id: 0, name: 'NA', imageUrl: '', price: 0 },
    ], 
    stock: 0,
    description: 'NA',
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
      }
    ]
  };