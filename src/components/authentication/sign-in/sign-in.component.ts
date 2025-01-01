import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, CommonModule],
})
export class SignInComponent {
  user = {
    email: '',
    password: '',
  };
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  signIn() {
    if (!this.user.email || !this.user.password) {
      console.log('Please fill in all fields.');
      return;
    }

    this.authService.signIn(this.user).then(
      (userData) => {
        console.log('Login successful:', userData);
        console.log(`Welcome back, ${userData.email}`);
        const roles = userData.roles || [];
        if (roles.includes('Admin')) {
          this.router.navigate(['/book-management']);
        } else {
          this.router.navigate(['/recommender']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        console.log(error);
      }
    );
  }
}
