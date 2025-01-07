import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SignUpComponent {
  user = {
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    agree: false,
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signUp(signUpForm: NgForm) {
    if (signUpForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    try {
      console.log('Signing up with user data:', this.user);
      const response = await this.authService.signUp(this.user);
      console.log('User created successfully:', response);
      this.router.navigate(['/model']).then(() => {
        setTimeout(() => this.router.navigate(['/signIn']), 7000);
      });
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Sign-up failed. Please try again.');
    }
  }
}
