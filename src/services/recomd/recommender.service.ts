import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getRecommendations(title: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}${title}`);
  }
}
