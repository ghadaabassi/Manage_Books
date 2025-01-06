import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  imports: [NgFor,NgIf],
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
