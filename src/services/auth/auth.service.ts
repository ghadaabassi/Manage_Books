import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    email: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.realworld.io/api/users';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/`, { user })
      .pipe(catchError(this.handleError));
  }

  signIn(user: User): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { user })
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  setSession(authResponse: AuthResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(authResponse));
    this.currentUserSubject.next(authResponse.user);
  }

  private handleError(error: any): Observable<never> {
    console.error('API error', error);
    throw error;
  }
}
