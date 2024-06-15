import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  router: Router=inject(Router);
  authService:AuthService=inject(AuthService);
  constructor() { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      token => {
        this.authService.setToken(token);

        this.router.navigate(['/tienda']);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
