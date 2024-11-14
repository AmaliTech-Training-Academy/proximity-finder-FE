import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface SocialMedia {
  name: string;
  icon: string;
  pattern: RegExp;
  link: string;
  isValid: boolean;
}

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.sass'
})
export class SocialsComponent {
  socialMedias: SocialMedia[] = [
    { name: 'Facebook', icon: 'assets/images/facebook.png',pattern: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9._-]+$/,link: '', isValid: true  },
    { name: 'Twitter', icon: 'assets/images/twitter.png', pattern: /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_]+$/,link: '', isValid: true },
    { name: 'LinkedIn', icon: 'assets/images/linkedin.png',pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+$/, link: '', isValid: true},
    { name: 'Pinterest', icon: 'assets/images/pinterest.png', pattern: /^(https?:\/\/)?(www\.)?pinterest\.com\/[A-Za-z0-9_-]+\/?$/, link: '', isValid: true  }
    
  ];

  
 
  selectedSocialMedias: SocialMedia[] = [];
  selectedOption: string = '';
  maxLinks = 5; // Maximum allowed links

  addSocialMedia() {
    if (this.selectedSocialMedias.length < this.maxLinks) {
      const selectedMedia = this.socialMedias.find(
        media => media.name === this.selectedOption
      );
      if (selectedMedia) {
        this.selectedSocialMedias.push({ ...selectedMedia, link: '', isValid: true });
        this.selectedOption = ''; // Reset the dropdown selection
      }
    }
  }

  updateLink(index: number, link: string) {
    this.selectedSocialMedias[index].link = link;
    const pattern = this.selectedSocialMedias[index].pattern;
    this.selectedSocialMedias[index].isValid = pattern.test(link);
  }

  deleteSocialMedia(index: number) {
    this.selectedSocialMedias.splice(index, 1);
  }

  canAddMoreLinks(): boolean {
    return this.selectedSocialMedias.length < this.maxLinks;
  }
}