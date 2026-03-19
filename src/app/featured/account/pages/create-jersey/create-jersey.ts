import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from '@app/shared/components/input/input';
import { ToggleButtonGroup, ToggleOption } from '@app/shared/components/toggle-button-group/toggle-button-group';
import { RadioGroup, RadioOption } from '@app/shared/components/radio-group/radio-group';
import { ImageUploader, UploadedImage } from '@app/shared/components/image-uploader/image-uploader';
import { SelectDropdown, SelectOption } from '@app/shared/components/select-dropdown/select-dropdown';
import { ButtonGeneric } from '@app/shared/components/button-generic/button-generic';
import { JerseyApi } from '@app/featured/jerseys/services/jersey-api';

@Component({
  selector: 'app-create-jersey',
  templateUrl: './create-jersey.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    Input,
    ToggleButtonGroup,
    RadioGroup,
    ImageUploader,
    SelectDropdown,
    ButtonGeneric,
  ],
})
export class CreateJerseyPage {
  private fb = inject(FormBuilder);
  private jerseyApi = inject(JerseyApi);

  
  errorMessage = computed(() => this.jerseyApi.errorResponse().message);
  loading = computed(() => this.jerseyApi.loading());
  successMessage = computed(() => (this.jerseyApi.successMessage() ? this.jerseyApi.successMessage() : null));

  typeOptions: ToggleOption[] = [
    { value: 'retro', label: 'Retro' },
    { value: 'player', label: 'Jugador' },
    { value: 'fan', label: 'Fan' },
  ];

  genderOptions: RadioOption[] = [
    { value: 'male', label: 'Hombre' },
    { value: 'female', label: 'Mujer' },
  ];

  sizeOptions: ToggleOption[] = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: '2XL', label: '2XL' },
  ];

  categoryOptions: SelectOption[] = [
    { value: 'Premier League', label: 'Premier League - Inglaterra' },
    { value: 'La Liga', label: 'La Liga - España' },
    { value: 'Serie A', label: 'Serie A - Italia' },
    { value: 'Bundesliga', label: 'Bundesliga - Alemania' },
    { value: 'Ligue 1', label: 'Ligue 1 - Francia' },
    { value: 'Selecciones', label: 'Selecciones Nacionales' },
  ];

  jerseyForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    clubName: ['', [Validators.required]],
    type: ['retro', [Validators.required]],
    gender: ['male', [Validators.required]],
    sizes: [['M', 'L', 'XL', '2XL'], [Validators.required]],

    weight: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    season: ['', [Validators.required]],

    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],

    category: ['', [Validators.required]],
    categoryName: [''],
  });

  productImages = signal<UploadedImage[]>([]);
  patchImages = signal<UploadedImage[]>([]);
  selectedCategories = signal<string[]>([]);

  onProductImagesChange(images: UploadedImage[]): void {
    this.productImages.set(images);
  }

  onPatchImagesChange(images: UploadedImage[]): void {
    this.patchImages.set(images);
  }

  addCategoryFromDropdown(): void {
    const categoryValue = this.jerseyForm.get('category')?.value;
    if (categoryValue && !this.selectedCategories().includes(categoryValue)) {
      this.selectedCategories.update((cats) => [...cats, categoryValue]);
    }
  }

  addCategoryFromInput(): void {
    const categoryName = this.jerseyForm.get('categoryName')?.value?.trim();
    if (categoryName && !this.selectedCategories().includes(categoryName)) {
      this.selectedCategories.update((cats) => [...cats, categoryName]);
    }
  }

  removeCategory(category: string): void {
    this.selectedCategories.update((cats) => cats.filter((c) => c !== category));
  }

  private readonly TYPE_MAP: Record<string, string> = {
    retro: 'Retro',
    player: 'Jugador',
    fan: 'Fan',
  };

  private readonly GENDER_MAP: Record<string, string> = {
    male: 'Male',
    female: 'Female',
  };

  onSubmit(): void {
    if (this.jerseyForm.invalid) {
      this.jerseyForm.markAllAsTouched();
      this.jerseyApi.errorResponse.set({error: true, message: 'Por favor, completa todos los campos requeridos.'});
      setTimeout(() => this.jerseyApi.errorResponse.set({error: false, message: null}), 3000);
      return;
    }

    const formValue = this.jerseyForm.value;
    const formData = new FormData();

    formData.append('Name', formValue.name || '');
    formData.append('ClubName', formValue.clubName || '');
    formData.append('Price', String(formValue.price));
    formData.append('Stock', String(formValue.stock));
    formData.append('Type', this.TYPE_MAP[formValue.type || 'retro']);
    formData.append('Sex', this.GENDER_MAP[formValue.gender || 'male']);

    const sizes = formValue.sizes || [];
    sizes.forEach((size, index) => {
      formData.append(`SizeSymbols[${index}]`, size);
    });

    formData.append('Weight', formValue.weight || '');
    formData.append('Brand', formValue.brand || '');
    formData.append('Season', formValue.season || '');

    const categories = this.selectedCategories();
    if (categories.length === 0) {
      this.jerseyApi.toggleLoading(false);
      this.jerseyApi.errorResponse.set({error: true, message: 'Agrega al menos una categoría'});
      setTimeout(() => this.jerseyApi.errorResponse.set({error: false, message: null}), 3000);
      return;
    }
    categories.forEach((cat, index) => {
      formData.append(`Categories[${index}]`, cat);
    });

    const productImgs = this.productImages();
    productImgs.forEach((img) => {
      if (img.file) {
        formData.append('Images', img.file as File);
      }
    });

    const patches = this.patchImages();
    patches.forEach((patch) => {
      if (patch.file) {
        formData.append('PatchImages', patch.file as File);
      }
    });

    if (patches.length > 0) {
      const patchMetadata = patches.map((patch) => ({
        name: patch.file?.name || 'Patch',
        season: formValue.season || '',
      }));
      formData.append('PatchMetadata', JSON.stringify(patchMetadata));
    }

    this.jerseyApi.toggleLoading(true);

    this.jerseyApi.createJersey(formData);

    if (this.jerseyApi.isSuccessCreate()){
      this.resetForm();
    } 
  }

  private resetForm(): void {
    this.jerseyForm.reset({
      name: '',
      clubName: '',
      type: 'retro',
      gender: 'male',
      sizes: ['M', 'L', 'XL', '2XL'],
      weight: '',
      brand: '',
      season: '',
      price: 0,
      stock: 0,
      category: '',
      categoryName: '',
    });
    this.productImages.set([]);
    this.patchImages.set([]);
    this.selectedCategories.set([]);
  }

  getFieldError(fieldName: string): string | null {
    const control = this.jerseyForm.get(fieldName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['min']) return `El valor mínimo es ${control.errors['min'].min}`;
    }
    return null;
  }
}
