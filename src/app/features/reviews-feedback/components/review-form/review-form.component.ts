import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextareaModule, ReactiveFormsModule, RatingModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.sass'
})
export class ReviewFormComponent {

  visible: boolean = false;
  value!: number;

    showDialog() {
        this.visible = true;
    }
}
