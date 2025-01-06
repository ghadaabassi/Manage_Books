import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  templateUrl: './admin-orders.component.html',
  imports: [NgFor, FormsModule,NgIf]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  statuses: string[] = ['pending', 'processing', 'shipped', 'delivered'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  updateStatus(orderId: string, newStatus: string): void {
    if (this.statuses.includes(newStatus)) {
      this.orderService.updateOrderStatus(orderId, newStatus as any);
    }
  }
}
