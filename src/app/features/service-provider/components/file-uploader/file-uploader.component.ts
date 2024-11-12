import { Component } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.sass',
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  selectedFileName: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      console.log('Uploading:', this.selectedFile);
      this.selectedFile = null;
      this.selectedFileName = '';
    } else {
      alert('Please select a file first!');
    }
  }
}
