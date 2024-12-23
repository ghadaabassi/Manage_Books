import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structures of the API response
interface VolumeInfo {
  title: string;
  authors?: string[];
  previewLink?: string;
}

interface Item {
  volumeInfo: VolumeInfo;
}

interface ApiResponse {
  items: Item[];
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

  constructor(private http: HttpClient) {}

  // Method to get recommendations based on a book title
  getRecommendations(title: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}${title}`);
  }
}
