import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'bookstore_cart';
  private cartItems = new BehaviorSubject<Product[]>(this.loadCart());

  constructor() {}

  private loadCart(): Product[] {
    const savedCart = localStorage.getItem(this.STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(items: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      this.saveCart(updatedItems);
    } else {
      this.saveCart([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === productId);

    if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
      const updatedItems = currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      );
      this.saveCart(updatedItems);
    } else {
      this.saveCart(currentItems.filter(item => item.id !== productId));
    }
  }

  getCart(): Observable<Product[]> {
    return this.cartItems.asObservable();
  }

  clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.cartItems.next([]);
  }
}
