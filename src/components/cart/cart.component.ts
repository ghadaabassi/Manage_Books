import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';

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

  constructor(private cartService: CartService) {}

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
    // Implement order placement logic
    console.log('Placing order for:', this.cartItems);
    this.cartService.clearCart();
  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0);
  }
}
