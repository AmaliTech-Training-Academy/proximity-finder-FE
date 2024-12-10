import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../services/review.service';
import { Ireview } from '../../models/ireview';


@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextareaModule, ReactiveFormsModule, RatingModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.sass'
})
export class ReviewFormComponent{

  visible: boolean = false;
  value!: number;

  constructor(private reviewService: ReviewService, private fb: FormBuilder) { }

  reviewForm = this.fb.group({
    value:  [0, Validators.required],
    text: ['', Validators.required]
  })

  showDialog() {
      this.visible = true;
  }

  onSubmit() {
    if(this.reviewForm.valid) {
      const {value, text} = this.reviewForm.value

      const review: Ireview = {
        rating: value!,
        content: text!,
        providerServiceId: '1a2f2173-b3ef-43be-80d6-da8d380c1495',
        isAnonymous: false,
      }

      this.reviewService.createReview(review).subscribe({
        next: (response) => {
          console.log(response)
          this.visible = false
        },
        error: (error) => {
          console.error('Error creating review:', error)
        }
      })
    }
  }
}
