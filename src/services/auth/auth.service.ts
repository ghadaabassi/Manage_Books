import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import Backendless from 'backendless';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.backendless.API_KEY;
  private apiId = environment.backendless.APP_ID;
  private assignRoleApi = environment.backendless.ROLE_API;

  constructor() {
    Backendless.initApp(this.apiId, this.apiKey);
  }

  /**
   * Register a new user and assign the "Reader" role using the Backendless API
   * @param userData User registration data
   * @returns A Promise containing the result of the registration
   */
  async signUp(userData: any): Promise<any> {
    try {
      const response = await fetch(this.assignRoleApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register user with "Reader" role.');
      }

      const result = await response.json();
      console.log('User registered successfully with Reader role:', result);

      return result;
    } catch (error) {
      console.error('Error during sign-up process:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Sign in a user
   * @param userData User credentials (email and password)
   * @returns A Promise containing the user on successful login
   */
  async signIn(userData: any): Promise<any> {
    try {
      const user = await Backendless.UserService.login(
        userData.email,
        userData.password,
      );

      const roles = await Backendless.UserService.getUserRoles();
      console.log('User roles:', roles);

      localStorage.setItem('userRoles', JSON.stringify(roles));

      return { user, roles };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Sign out the current user
   * @returns A Promise to log out the user
   */
  async signOut(): Promise<void> {
    try {
      await Backendless.UserService.logout();
    } catch (error) {
      throw this.handleError(error);
    }
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
    return error?.message || 'An unknown error occurred.';
  }
}
