import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommender.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface VolumeInfo {
  title: string;
  authors?: string[];
  previewLink?: string;
  imageLink?: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
}

interface ApiResponse {
  items: {
    volumeInfo: VolumeInfo;
  }[];
}

@Component({
  selector: 'app-book-recommender',
  templateUrl: './book-recommender.component.html',
  styleUrls: ['./book-recommender.component.css'],
  imports: [FormsModule, CommonModule],
})
export class BookRecommenderComponent {
  books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
  ];

  similarBooks: { [key: number]: VolumeInfo[] } = {};

  loading: { [key: number]: boolean } = {};

  constructor(private recommenderService: RecommendationService) {}

  fetchSimilarBooks(book: Book): void {
    this.loading[book.id] = true;

    this.recommenderService.getRecommendations(book.title).subscribe(
      (data: ApiResponse) => {
        this.similarBooks[book.id] = data.items.map((item) => item.volumeInfo);
        this.loading[book.id] = false;
      },
      (error) => {
        console.error('Error fetching similar books', error);
        this.loading[book.id] = false;
      }
    );
  }
}
