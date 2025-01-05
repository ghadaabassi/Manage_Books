import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '../slider/slider.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  menuItems = [
    { name: 'Home', link: '/home', active: true },
    { name: 'Pages', link: '/pages', active: false },
    { name: 'Featured', link: '/featured', active: false },
    { name: 'Popular', link: '/popular', active: false },
    { name: 'Offer', link: '/offer', active: false },
    { name: 'Articles', link: '/articles', active: false },
    { name: 'Download App', link: '/download', active: false },
  ];

  socialLinks = [
    { icon: 'icon icon-facebook', link: 'https://facebook.com' },
    { icon: 'icon icon-twitter', link: 'https://twitter.com' },
    { icon: 'icon icon-youtube-play', link: 'https://youtube.com' },
    { icon: 'icon icon-behance-square', link: 'https://behance.net' },
  ];

  searchValue = '';

  featuredProducts: Product[] = [
    {
      id: '1',
      title: 'Simple way of piece life',
      author: 'Armor Ramsey',
      price: 40.00,
      image: 'images/product-item1.jpg',
      description: '',
      category: 'featured',
      stock: 10,
      quantity: 0
    },
    {
      id: '2',
      title: 'Great travel at desert',
      author: 'Sanchit Howdy',
      price: 38.00,
      image: 'images/product-item2.jpg',
      description: '',
      category: 'featured',
      stock: 10,
      quantity: 0
    },
    {
      id: '3',
      title: 'The lady beauty Scarlett',
      author: 'Arthur Doyle',
      price: 45.00,
      image: 'images/product-item3.jpg',
      description: '',
      category: 'featured',
      stock: 10,
      quantity: 0
    },
    {
      id: '4',
      title: 'Once upon a time',
      author: 'Klien Marry',
      price: 35.00,
      image: 'images/product-item4.jpg',
      description: '',
      category: 'featured',
      stock: 10,
      quantity: 0
    }
  ];

  allProducts: Product[] = [
    {
      id: '5',
      title: 'Portrait photography',
      author: 'Adam Silber',
      price: 40.00,
      image: 'images/tab-item1.jpg',
      description: '',
      category: 'all',
      stock: 10,
      quantity: 0
    },
    // Add more products for different categories
  ];

  specialOfferProducts: Product[] = [
    {
      id: '20',
      title: 'Simple way of piece life',
      author: 'Armor Ramsey',
      price: 40.00,
      image: 'images/product-item5.jpg',
      description: '',
      category: 'special',
      stock: 10,
      quantity: 0
    },
    // Add more special offer products
  ];

  activeCategory: string = 'all';

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  toggleMenu() {
    // Handle responsive menu toggle
  }

  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
