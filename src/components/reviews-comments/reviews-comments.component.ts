import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews-comments',
  templateUrl: './reviews-comments.component.html',
  styleUrls: ['./reviews-comments.component.css'],
  imports:[CommonModule, FormsModule,NgFor]
})
export class ReviewsCommentsComponent {
  reviewText: string = '';
  reviews: string[] = [];

  addReview() {
    if (this.reviewText.trim()) {
      this.reviews.push(this.reviewText);
      this.reviewText = '';
    }
  }
}