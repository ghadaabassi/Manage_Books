import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly STORAGE_KEY = 'notifications';
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const notifications = stored ? JSON.parse(stored) : [];
    this.notificationsSubject.next(notifications);
  }

  private saveNotifications(notifications: Notification[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
    this.notificationsSubject.next(notifications);
  }

  addNotification(title: string, content: string): void {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      content,
      timestamp: new Date(),
      read: false
    };

    const current = this.notificationsSubject.value;
    this.saveNotifications([notification, ...current]);
  }

  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.saveNotifications(notifications);
  }

  clearNotification(id: string): void {
    const notifications = this.notificationsSubject.value.filter(
      notification => notification.id !== id
    );
    this.saveNotifications(notifications);
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }
}
