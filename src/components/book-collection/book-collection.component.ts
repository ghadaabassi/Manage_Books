import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BookCollectionComponent implements OnInit {
  query: string = '';
  books: any[] = [];
  defaultBooks: any[] = [];
  filteredBooks: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDefaultBooks();
  }

  fetchDefaultBooks() {
    const defaultQuery = 'literature';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${defaultQuery}`;

    this.loading = true;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.defaultBooks = data.items || [];
        this.books = this.defaultBooks;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch default books.';
        this.loading = false;
      }
    );
  }

  onInputChange() {
    if (this.query.length > 2) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${this.query}`;
      this.http.get<any>(url).subscribe(
        (data) => {
          this.filteredBooks = data.items || [];
        },
        (error) => {
          this.error = 'Failed to fetch suggestions.';
        }
      );
    } else {
      this.filteredBooks = [];
    }
  }

  searchBooks() {
    if (!this.query) {
      this.books = this.defaultBooks;
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${this.query}`;

    this.loading = true;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.books = data.items || [];
        this.filteredBooks = [];
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to fetch books. Please try again.';
        this.loading = false;
      }
    );
  }

  selectBook(book: any) {
    this.query = book.volumeInfo.title;
    this.filteredBooks = [];
    this.searchBooks();
  }
}
