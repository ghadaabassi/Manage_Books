import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  user = { email: '', password: '', username: '', confirmPassword: '' };

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.signUp(this.user).subscribe(
      (response) => {
        this.authService.setSession(response);
        this.router.navigate(['/model']).then(() => {
          setTimeout(() => {
            this.router.navigate(['/aboutUs']);
          }, 7000);
        });
      },
      (error) => {
        console.error('Sign-up error:', error);
      }
    );
  }

  isFormValid(): boolean {
    return (
      this.user.password === this.user.confirmPassword &&
      this.user.username?.trim().length > 0 &&
      this.user.email?.trim().length > 0 &&
      this.user.password?.trim().length > 0
    );
  }
}
