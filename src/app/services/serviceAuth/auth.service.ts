import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../../interfaces/authResponse';
import { User } from '../../interfaces/user';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {jwtDecode} from 'jwt-decode'; // Ajuste en la importación
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private apiUrl2 = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  user!:User;

  login(username: string, password: string): Observable<string> {
    return this.http.post<AuthResponse>(this.apiUrl, { username, password })
      .pipe(
        map(response => {
          const token = response.token;
          this.setToken(token);
          return token;
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded Token:', decoded); // Verifica la estructura del token
      return decoded.sub; // Ajusta esto según el campo que contenga el ID en tu token
    }
    return null;
  }

  getUserDetails(userId: number): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<User>(`https://fakestoreapi.com/users/${userId}`, { headers })
      .pipe(
        tap(user => {
          this.user = user; // Asignar el valor de usuario
        }),
        catchError(error => {
          console.error('Error al obtener detalles de usuario:', error);
          return throwError(error); // Propagar el error
        })
      );
  }

  getUser():User
  {
    return this.user;
  }
}
