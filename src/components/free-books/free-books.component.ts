import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var google: any;
@Component({
  selector: 'app-free-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './free-books.component.html',
  styleUrls: ['./free-books.component.css'],
})
export class FreeBooksComponent implements OnInit {
  isbn: string = '';
  viewer: any;

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/books/jsapi.js';
    script.onload = () => google.books.load();
    document.body.appendChild(script);
  }

  initialize(): void {
    if (!this.isbn) {
      alert('Please enter an ISBN!');
      return;
    }

    this.viewer = new google.books.DefaultViewer(
      document.getElementById('viewerCanvas')
    );

    this.viewer.load(`ISBN:${this.isbn}`, this.alertNotFound);
  }

  startAutoTurn(): void {
    if (!this.viewer) {
      alert('Please start reading first!');
      return;
    }
    this.nextStep(this.viewer);
  }

  nextStep(viewer: any): void {
    setTimeout(() => {
      viewer.nextPage();
      this.nextStep(viewer);
    }, 3000);
  }

  alertNotFound(): void {
    alert('Book not found!');
  }
}
