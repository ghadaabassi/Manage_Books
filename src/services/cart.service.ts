import { Injectable } from '@angular/core';
import { Product } from '../components/product-card/product-card.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'bookstore_cart';
  private cartItems = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const stored = localStorage.getItem(this.cartKey);
    if (stored) {
      this.cartItems.next(JSON.parse(stored));
    }
  }

  private saveCart(items: Product[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: Product) {
    const current = this.cartItems.value;
    this.saveCart([...current, product]);
  }

  getCart() {
    return this.cartItems.asObservable();
  }
}
