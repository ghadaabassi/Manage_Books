import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAddress } from '../../models/Order';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone:true,
  templateUrl: './order.component.html',
  imports:[FormsModule,NgFor],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  address: OrderAddress = {
    country: '',
    city: '',
    address: '',
    postalCode: ''
  };
  cartItems: Product[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartSnapshot();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  onSubmit(): void {
    if (this.validateForm()) {
      try {
        const order = this.orderService.placeOrder(this.address);
        // Navigate to the order confirmation page
        this.router.navigate(['/order-confirmation']);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  }

  public validateForm(): boolean {
    return !!(
      this.address.country?.trim() &&
      this.address.city?.trim() &&
      this.address.address?.trim() &&
      this.address.postalCode?.trim()
    );
  }
}
