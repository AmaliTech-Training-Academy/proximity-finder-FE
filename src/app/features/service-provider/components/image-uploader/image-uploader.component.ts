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
  imagePreviews: string[] = [];

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
    this.files = Array.from(fileList);

    this.imagePreviews = [];

    this.files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        this.imagePreviews.push(imageUrl);
      }
    });
  }
}
