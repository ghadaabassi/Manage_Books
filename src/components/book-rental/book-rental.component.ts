import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-rental',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-rental.component.html',
  styleUrls: ['./book-rental.component.css']
})
export class BookRentalComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  bookTitle: string = '';
  rentalDuration: number = 0;
}