import { Injectable } from '@angular/core';
import { Order, OrderAddress } from '../models/Order';
import { CartService } from './cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly STORAGE_KEY = 'bookstore_orders';
  private orders = new BehaviorSubject<Order[]>(this.loadOrders());

  constructor(private cartService: CartService) {}

  private loadOrders(): Order[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    this.orders.next(orders);
  }

  placeOrder(address: OrderAddress): Order {
    const cartItems = this.cartService.getCartSnapshot();
    const total = cartItems.reduce((sum, item) =>
      sum + (item.price * (item.quantity || 1)), 0);

    const newOrder: Order = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      address,
      date: new Date(),
      status: 'pending'
    };

    const currentOrders = this.loadOrders();
    this.saveOrders([...currentOrders, newOrder]);
    this.cartService.clearCart();

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered'): void {
    const currentOrders = this.loadOrders();
    const orderIndex = currentOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      currentOrders[orderIndex].status = status;
      this.saveOrders(currentOrders);
    } else {
      console.error(`Order with ID ${orderId} not found.`);
    }
  }

  getOrders(): Observable<Order[]> {
    return this.orders.asObservable();
  }
}
