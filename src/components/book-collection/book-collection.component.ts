import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-collection',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-collection.component.html',
  styleUrl: './book-collection.component.css',
})
export class BookCollectionComponent {
  books: any[] = [];
  query: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch literature books on load
    this.fetchLiteratureBooks();
  }

  fetchLiteratureBooks(): void {
    const literatureQuery = 'classic literature';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      literatureQuery
    )}`;

    this.loading = true;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.books = response.items || [];
        this.loading = false;

        if (this.books.length === 0) {
          this.error = 'No literature books found.';
        }
      },
      (error) => {
        this.error = 'Failed to fetch books. Please try again later.';
        this.loading = false;
      }
    );
  }

  fetchBooks(): void {
    if (!this.query.trim()) {
      this.error = 'Search query cannot be empty!';
      return;
    }

    this.loading = true;
    this.error = null;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      this.query
    )}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.books = response.items || [];
        this.loading = false;

        if (this.books.length === 0) {
          this.error = 'No books found for this query.';
        }
      },
      (error) => {
        this.error = 'Failed to fetch books. Please try again later.';
        this.loading = false;
      }
    );
  }
}
