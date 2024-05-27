import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }
  obtenerTodosLosCarritos(): Observable<Cart[]>
  {
    return this.http.get<Cart[]>("https://fakestoreapi.com/carts"); //esto es un observable.
  }
  obtenerCarritoPorId(id:number)
  {
    return this.http.get<Cart>("https://fakestoreapi.com/carts/" + id);
  }
  eliminarCarritoPorId(id: number): Observable<any> {
    return this.http.delete('https://fakestoreapi.com/carts/' + id);
  }
  obtenerNcarritos(n:number)
  {
    return this.http.get<Cart[]>("https://fakestoreapi.com/carts?limit=" + n);
  }

  obtenerCarritosDesc()
  {
    return this.http.get<Cart[]>("https://fakestoreapi.com/carts?sort=desc"); //esto es un observable.
  }

  obtenerCarritosAsc()
  {
    return this.http.get<Cart[]>("https://fakestoreapi.com/carts?sort=asc"); //esto es un observable.
  }

  obtenerCarritosDeUsuario(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`https://fakestoreapi.com/carts/user/${userId}`);
  }
  
}
