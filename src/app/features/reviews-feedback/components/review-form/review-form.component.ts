import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { ReviewService } from '../../services/review.service';
import { Ireview } from '../../models/ireview';
import { NOTYF } from '../../../../shared/notify/notyf.token';


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
  private notyf = inject(NOTYF)

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
        providerServiceId: '2a5f5e10-15e3-4613-92ad-162619593100',
        isAnonymous: false,
      }

      this.reviewService.createReview(review).subscribe({
        next: (response) => {
          this.visible = false
          this.notyf.success('Review created successfully')
          this.reviewForm.reset()
        },
        error: (error) => {
          console.error('Error creating review:', error)
          this.notyf.error('Error creating review')
        }
      })
    }
  }
}
