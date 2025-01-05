import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ToastNotificationComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: Product;
  showToast = false;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  addToCart(event: Product): void {
    this.cartService.addToCart(this.product);
    this.notificationService.addNotification(
      'Product Added',
      `${this.product.title} has been added to your cart`
    );
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}


