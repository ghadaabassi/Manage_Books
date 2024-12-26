import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import Backendless from 'backendless';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiKey = environment.backendless.API_KEY;
  private apiId = environment.backendless.APP_ID;

  constructor() {
    Backendless.initApp(this.apiId, this.apiKey);
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns A Promise containing the result of the registration
   */
  signUp(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Backendless.UserService.register(userData)
        .then((user) => resolve(user))
        .catch((error) => reject(this.handleError(error)));
    });
  }

  /**
   * Sign in a user
   * @param userData User credentials (email and password)
   * @returns A Promise containing the user on successful login
   */
  signIn(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      Backendless.UserService.login(userData.email, userData.password)
        .then((user) => resolve(user))
        .catch((error) => reject(this.handleError(error)));
    });
  }

  /**
   * Sign out the current user
   * @returns A Promise to log out the user
   */
  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      Backendless.UserService.logout()
        .then(() => resolve())
        .catch((error) => reject(this.handleError(error)));
    });
  }

  /**
   * Get the current logged-in user
   * @returns The current user or null if no user is logged in
   */
  getCurrentUser(): any {
    return Backendless.UserService.getCurrentUser();
  }

  /**
   * Handle errors from Backendless API
   * @param error The error object returned from Backendless API
   * @returns A human-readable error message
   */
  private handleError(error: any): string {
    if (error && error.message) {
      return error.message;
    }
    return 'An unknown error occurred.';
  }
}
