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

  constructor(
    private backendlessService: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.backendlessService.signUp(this.user).then(
      (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/model']).then(() => {
          setTimeout(() => {
            this.router.navigate(['/free']);
          }, 5000);
        });
      },
      (error) => {
        console.error('Error during sign up:', error);
      }
    );
  }
}
