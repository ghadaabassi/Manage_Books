import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngFor

@Component({
  selector: 'app-feedback',
  standalone: true,  // Make the component standalone
  imports: [FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  feedback = {
    rating: 5,
    comment: ''
  };

  // Array to iterate for star ratings
  stars = [1, 2, 3, 4, 5];

  onSubmit(): void {
    // Handle feedback submission here
    console.log('Feedback submitted:', this.feedback);
    alert('Thank you for your feedback!');
  }
}
