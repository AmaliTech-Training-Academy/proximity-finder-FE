import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../../../../core/services/photo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [GalleriaModule, CommonModule, FormsModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.sass',
})
export class PhotosComponent {
  displayCustom!: boolean;

    activeIndex: number = 0;

    images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
