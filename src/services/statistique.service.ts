import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  // Simulating real-time data with random values for monthly sales
  getSalesData(): Observable<number[]> {
    const salesData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
    return of(salesData);  // Observable data stream
  }
}
