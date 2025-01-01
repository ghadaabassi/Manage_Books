import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { Product } from '../../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  imports: [FormsModule,NgIf,NgFor],
})
export class BookManagementComponent implements OnInit {
  books: Product[] = [];
  newBook: Product = {
    title: '',
    author: '',
    image: '',
    price: 0,
    stock: 0
  };
  editIndex: number | null = null;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = this.booksService.getAllBooks();
  }

  addBook(): void {
    this.booksService.addBook({ ...this.newBook });
    this.newBook = { title: '', author: '', image: '', price: 0, stock: 0 };
    this.loadBooks();
  }

  editBook(index: number): void {
    this.editIndex = index;
  }

  saveBook(index: number, updated: Product): void {
    this.booksService.updateBook(index, updated);
    this.editIndex = null;
    this.loadBooks();
  }

  deleteBook(index: number): void {
    this.booksService.deleteBook(index);
    this.loadBooks();
  }
}
