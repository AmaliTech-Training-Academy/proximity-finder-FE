import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.sass',
})
export class FileUploaderComponent {
  selectedFiles: File[] = [];
  selectedFileNames: string[] = [];

  @Output() filesSelected = new EventEmitter<File[]>();

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);

      newFiles.forEach((file) => {
        if (
          !this.selectedFiles.some(
            (f) => f.name === file.name && f.size === file.size
          )
        ) {
          this.selectedFiles.push(file);
          this.selectedFileNames.push(file.name);
        }
      });

      this.filesSelected.emit(this.selectedFiles);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filesSelected.emit(this.selectedFiles);
  }

  resetSelection(): void {
    this.selectedFiles = [];
    this.selectedFileNames = [];

    this.filesSelected.emit(this.selectedFiles);
  }
}
