import { Product } from './Product';

export interface OrderAddress {
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface Order {
  id: string;
  items: Product[];
  total: number;
  address: OrderAddress;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
