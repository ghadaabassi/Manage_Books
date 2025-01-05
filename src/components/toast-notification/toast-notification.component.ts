import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() onClose = new EventEmitter<void>();
}
