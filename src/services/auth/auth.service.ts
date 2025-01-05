import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import Backendless from 'backendless';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.backendless.API_KEY;
  private apiId = environment.backendless.APP_ID;
  private assignRoleApi = environment.backendless.ROLE_API;

  constructor(private router: Router) {
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
      } else {
        this.router.navigate(['/login']);
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

  getCurrentUserData(): Promise<any> {
    return Backendless.UserService.getCurrentUser()
      .then((currentUser) => {
        if (currentUser) {
          console.log('Current User Data: ', currentUser);
          console.log('User Email: ', currentUser.email);
          console.log('Username: ', currentUser.username);
          return currentUser;
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

  async updateUserData(updatedData: {
    username?: string;
    email?: string;
    password?: string;
  }) {
    const currentUser = await Backendless.UserService.getCurrentUser();

    if (!currentUser) {
      throw new Error('User not logged in');
    }

    try {
      const user = currentUser as Backendless.User;
      if (updatedData.username) {
        user.username = updatedData.username;
      }

      if (updatedData.email) {
        user.email = updatedData.email;
      }

      if (updatedData.password) {
        user.password = updatedData.password;
      }

      const updatedUser = await Backendless.UserService.update(user);
      console.log('User data updated:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
}
