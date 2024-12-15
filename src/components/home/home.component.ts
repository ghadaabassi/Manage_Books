import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, SliderComponent],
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

  toggleMenu() {
    // Handle responsive menu toggle
  }

  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
