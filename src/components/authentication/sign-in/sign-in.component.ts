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
      alert('Please fill in all fields.');
      return;
    }

    this.authService.signIn(this.user).then(
      (user) => {
        console.log('Login successful:', user);
        alert(`Welcome back, ${user.username}`);
        this.router.navigate(['/recommender']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert(error);
      }
    );
  }
}
