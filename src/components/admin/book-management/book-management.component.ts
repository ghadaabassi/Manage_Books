import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { Product } from '../../../models/Product';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { AssetsService } from '../../../services/assets.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css'],
  imports: [FormsModule,NgIf,NgFor],
})
export class BookManagementComponent implements OnInit {
  books: Product[] = [];
  filteredBooks: Product[] = [];
  newBook: Product = {
    title: '',
    author: '',
    image: '',
    price: 0,
    description: '',
    category: '',
    stock: 0
  };
  searchQuery: string = '';
  searchCategory: string = '';
  searchAuthor: string = '';
  editIndex: number | null = null;
  selectedFile: File | null = null;
  viewMode: 'grid' | 'list' = 'grid';
  defaultImagePath: string = 'images/no-image.png';

  constructor(
    private booksService: BooksService,
    private assetsService: AssetsService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }
  searchBooks(): void {
    const query = (this.searchQuery || '').trim().toLowerCase();
    const category = (this.searchCategory || '').trim().toLowerCase();
    const author = (this.searchAuthor || '').trim().toLowerCase();

    this.filteredBooks = this.books.filter(book => {
      const matchTitle = !query || book.title?.toLowerCase().includes(query);
      const matchCategory = !category || book.category?.toLowerCase().includes(category);
      const matchAuthor = !author || book.author?.toLowerCase().includes(author);
      return matchTitle && matchCategory && matchAuthor;
    });

    console.log('Search Results:', this.filteredBooks);
  }

  loadBooks(): void {
    this.books = this.booksService.getAllBooks();
    this.filteredBooks = [...this.books];
    console.log(this.books)
  }

  addBook(): void {
    this.booksService.addBook({ ...this.newBook });
    this.newBook = { title: '', author: '', image: '', price: 0, description: '', category: '', stock: 0 };
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

  async handleFileInput(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const imagePath = await this.assetsService.saveImage(file);
      this.newBook.image = imagePath;
    }
  }

  async handleEditFileInput(event: any, index: number): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const imagePath = await this.assetsService.saveImage(file);
      this.books[index].image = imagePath;
    }
  }

  getImageUrl(path: string): string {
    console.log(path);
    return this.assetsService.getImageUrl(path);
  }

  toggleView(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  handleImageError(event: any): void {
    event.target.src = this.defaultImagePath;
  }
}
