/* ...existing code... */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',

})
export class ProductCardComponent {
  @Input() product!: Product;

}

export class Product {
  constructor(
    public title: string,
    public author: string,
    public image: string,
    public price: number,
    public description?: string,
    public stock: number = 0
  ) {}
}
