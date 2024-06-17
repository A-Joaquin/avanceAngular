import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './services/serviceAuth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  isAuthenticated: boolean=false;
  isNoAuthenticated: boolean=false;
  title = 'mi-tienda';
  router: Router=inject(Router);
  authService: AuthService=inject(AuthService);
  authSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.isNoAuthenticated = !isAuthenticated;
    });
  }

  signOut(): void {
    // Eliminar el token del almacenamiento local (localStorage)
    this.authService.logout();
    // Redirigir al usuario a la página de inicio de sesión o inicio
    this.router.navigate(['/inicio']);
  }
  
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}