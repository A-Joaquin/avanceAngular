import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/juegos/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:5000/usuarios';

  constructor(private http: HttpClient) { }

  obtenerTodosLosUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  obtenerUsuarioPorId(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${idUser}`);
  }

  eliminarUsuarioPorId(idUser: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idUser}`);
  }

  obtenerNusuarios(n: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?limit=${n}`);
  }

  obtenerUsuariosDesc(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?sort=desc`);
  }

  agregarUsuario(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>('http://127.0.0.1:5000/usuarios', user);
  }

  actualizarUsuario(idUser: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${idUser}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  modificarUsuario(idUser: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${idUser}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
