import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  obtenerTodosLosUsuarios(): Observable<User[]>
  {
    return this.http.get<User[]>("https://fakestoreapi.com/users"); //esto es un observable.
  }
  obtenerUsuarioPorId(idUser:number)
  {
    return this.http.get<User>("https://fakestoreapi.com/users/" + idUser);
  }
  eliminarUsuarioPorId(idUser: number): Observable<any> {
    return this.http.delete('https://fakestoreapi.com/users/' + idUser);
  }
  obtenerNusuarios(n:number)
  {
    return this.http.get<User[]>("https://fakestoreapi.com/users?limit=" + n);
  }
  obtenerUsuariosDesc()
  {
    return this.http.get<User[]>("https://fakestoreapi.com/users?sort=desc"); //esto es un observable.
  }
  agregarUsuario(user: User): Observable<User> {
    return this.http.post<User>('https://fakestoreapi.com/users', user);
  }



}
