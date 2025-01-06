import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;
  constructor(private cartService: CartService, private router: Router) {}
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  placeOrder(): void {
    this.router.navigate(['/order']);

  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0);
  }

  increaseQuantity(item: Product): void {
    this.cartService.addToCart(item);
  }

  decreaseQuantity(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  removeItemCompletely(productId: string): void {
    // Remove all quantities of the item
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.quantity) {
      for (let i = 0; i < item.quantity; i++) {
        this.cartService.removeFromCart(productId);
      }
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/order']);
  }
}
