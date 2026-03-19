import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PlusIconComponent } from '@app/icon/plus-icon/plus-icon';

export interface UploadedImage {
  file?: File;
  url: string;
  isPreview?: boolean;
}

export const IMAGE_UPLOADER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageUploader),
  multi: true,
};

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IMAGE_UPLOADER_VALUE_ACCESSOR],
  imports: [PlusIconComponent],
})
export class ImageUploader implements ControlValueAccessor {
  maxImages = input<number>(4);
  showPreview = input<boolean>(true);
  previewSize = input<'small' | 'large'>('small');
  accept = input<string>('image/*');

  images = signal<UploadedImage[]>([]);
  selectedIndex = signal<number>(0);
  imagesUpdated = output<UploadedImage[]>();
  imageRemoved = output<number>();

  private onChange: (value: UploadedImage[]) => void = () => {};
  private onTouched: () => void = () => {};

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const currentImages = this.images();
    const remainingSlots = this.maxImages() - currentImages.length;

    const filesToAdd = Array.from(input.files).slice(0, remainingSlots);

    const newImages: UploadedImage[] = filesToAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isPreview: true,
    }));

    this.images.set([...currentImages, ...newImages]);
    this.onChange(this.images());
    this.onTouched();
    this.imagesUpdated.emit(this.images());

    input.value = '';
  }

  selectImage(index: number): void {
    this.selectedIndex.set(index);
  }

  removeImage(index: number, event: Event): void {
    event.stopPropagation();
    const currentImages = this.images();
    const imageToRemove = currentImages[index];

    if (imageToRemove.isPreview && imageToRemove.url) {
      URL.revokeObjectURL(imageToRemove.url);
    }

    const updatedImages = currentImages.filter((_, i) => i !== index);
    this.images.set(updatedImages);
    this.onChange(updatedImages);
    this.imageRemoved.emit(index);
    this.imagesUpdated.emit(updatedImages);
  }

  canAddMore(): boolean {
    return this.images().length < this.maxImages();
  }

  getSelectedImage(): UploadedImage | null {
    const imgs = this.images();
    return imgs.length > 0 ? imgs[this.selectedIndex()] : null;
  }

  writeValue(value: UploadedImage[]): void {
    this.images.set(value ?? []);
  }

  registerOnChange(fn: (value: UploadedImage[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
