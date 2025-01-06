import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CartDropdownComponent } from "../cart-dropdown/cart-dropdown.component";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // Add this line
  imports: [CommonModule, RouterLink, CartDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
isDebug: boolean=true;
  unreadCount: number = 0;
  isNotificationsVisible = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isCartOpen = false;

  cartCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private cartService: CartService
  ) {}



  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.hasRole('Admin');

    this.notificationService.notifications$.subscribe(notifications => {
      this.unreadCount = notifications.filter(n => !n.read).length;
    });

    this.cartService.getCart().subscribe(cartItems => {
      this.cartCount = cartItems.length;
    });

    this.notificationService.notifications$.subscribe(notifications => {
      this.unreadCount = notifications.filter(n => !n.read).length;
    });
  }
  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
  }
  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  toggleNotifications(): void {
    console.log("test notif")
    this.isNotificationsVisible = !this.isNotificationsVisible;
  }

  toggleCartDropdown(): void {
    this.isCartOpen = !this.isCartOpen;
    console.log('====================================');
    console.log('Cart dropdown toggled');
    console.log('====================================');
  }

  async signIn() {
    await this.router.navigate(['/signIn']);
  }
  async signOut() {
    try {
      await this.authService.signOut();
      console.log('User signed out successfully');
      localStorage.removeItem('userRoles');
      await this.router.navigate(['/signIn']);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }

  removeNotification(id: string, event: Event): void {
    event.stopPropagation();
    this.notificationService.clearNotification(id);
  }

  clearAllNotifications(): void {
    this.notificationService.clearAllNotifications();
  }
}
