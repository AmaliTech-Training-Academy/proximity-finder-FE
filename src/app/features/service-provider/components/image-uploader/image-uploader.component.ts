import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.sass',
})
export class ImageUploaderComponent {
  isDragging = false;
  files: File[] = [];
  imagePreviews: { url: string; name: string }[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(input.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  private processFiles(fileList: FileList): void {
    const newFiles = Array.from(fileList);

    newFiles.forEach((file) => {
      if (
        file.type.startsWith('image/') &&
        !this.imagePreviews.some((img) => img.name === file.name)
      ) {
        const imageUrl = URL.createObjectURL(file);
        this.imagePreviews.push({ url: imageUrl, name: file.name });
      }
    });
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
  }
}
