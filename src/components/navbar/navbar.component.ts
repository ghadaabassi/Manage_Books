import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.hasRole('Admin');
  }
  async signIn() {
    await this.router.navigate(['/signIn']);
  }
  async signOut() {
    try {
      await this.authService.signOut();
      console.log('User signed out successfully');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('userScore');
      this.router.navigate(['/signIn']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }
}
