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
        true
      );

      const roles = await Backendless.UserService.getUserRoles();
      console.log('User roles:', roles);

      localStorage.setItem('userRoles', JSON.stringify(roles));

      return { user, roles };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  isAuthenticated(): boolean {
    const userData = localStorage.getItem(
      'Backendless_6AC1BC39-DAB7-4AD5-9FDF-976D80128B7C'
    );
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData['user-token'] !== undefined;
    }
    return false;
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  getCurrentUserData(): any {
    return Backendless.UserService.getCurrentUser()
      .then((currentUser) => {
        if (currentUser) {
          const userData = currentUser;

          console.log('Current User Data: ', userData);

          console.log('User Email: ', userData.email);
          console.log('Username: ', userData.username);
          // console.log('User Status: ', userData.userStatus);

          return userData;
        } else {
          console.log('No user is logged in.');
          return null;
        }
      })
      .catch((error) => {
        console.error('Error fetching current user: ', error);
        return null;
      });
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
   * Handle errors from Backendless API
   * @param error The error object returned from Backendless API
   * @returns A human-readable error message
   */
  private handleError(error: any): string {
    return error?.message || 'An unknown error occurred.';
  }
}
