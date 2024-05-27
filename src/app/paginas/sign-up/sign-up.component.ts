import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  constructor() {}

  signup() {
    if (this.username.trim() === '' || this.password.trim() === '' || this.confirmPassword.trim() === '') {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.signup(this.username, this.password).subscribe(
      response => {
        // Asume que el token viene en la respuesta
        const token = response.token;
        this.authService.setToken(token);
        this.router.navigate(['/tienda']);
      },
      error => {
        this.errorMessage = 'Error during sign up: ' + error.message;
      }
    );
  }
}
