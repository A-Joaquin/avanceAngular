import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mi-tienda';
  router: Router=inject(Router);
  signOut(): void {
    // Eliminar el token del almacenamiento local (localStorage)
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de inicio de sesión o inicio
    this.router.navigate(['/inicio']);
  }
}