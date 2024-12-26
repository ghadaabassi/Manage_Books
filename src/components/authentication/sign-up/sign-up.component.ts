import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private router: Router) {}
  onSubmit(): void {
    this.router.navigate(['/model']).then(() => {
      setTimeout(() => {
        this.router.navigate(['/aboutUs']);
      }, 7000);
    });
  }
}
