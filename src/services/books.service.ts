import { Injectable } from '@angular/core';
import { Product } from '../components/product-card/product-card.component';


@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private localStorageKey = 'books';

  getAllBooks(): Product[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  addBook(book: Product): void {
    const books = this.getAllBooks();
    books.push(book);
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  updateBook(index: number, updated: Product): void {
    const books = this.getAllBooks();
    books[index] = updated;
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  deleteBook(index: number): void {
    const books = this.getAllBooks();
    books.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }
}
