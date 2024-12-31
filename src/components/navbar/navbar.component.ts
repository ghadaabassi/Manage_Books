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

  ngOnInit(): void {
    this.isAuthenticated = true;
  }

  async signOut() {
    try {
      await this.authService.signOut();
      console.log('User signed out successfully');
      localStorage.removeItem('userRoles');
      await this.router.navigate(['/signIn']);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }
}
