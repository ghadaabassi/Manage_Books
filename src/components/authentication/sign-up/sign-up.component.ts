import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SignUpComponent {
  user = { email: '', password: '', username: '' };

  constructor(private authService: AuthService, private router: Router) {}

  async signUp() {
    try {
      const response = await this.authService.signUp(this.user);
      console.log('User created successfully:', response);
      this.router.navigate(['/model']).then(() => {
        setTimeout(() => this.router.navigate(['/free']), 5000);
      });
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign-up failed. Please try again.');
    }
  }
}
