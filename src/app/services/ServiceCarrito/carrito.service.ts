import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://fakestoreapi.com/carts';

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


  obtenerCarritoMasReciente(userId: number): Observable<Cart> {
    return this.obtenerCarritosDeUsuario(userId).pipe(
      map(carritos => {
        if (carritos.length === 0) {
          throw new Error('No hay carritos para este usuario.');
        }
        // Obtener el último carrito del array
        return carritos[carritos.length - 1];
      }),
      catchError(err => {
        console.error('Error al obtener el carrito más reciente:', err);
        return throwError(err);
      })
    );
  }

  agregarProductoAlCarritoMasReciente(newProduct: { productId: number, quantity: number }, userId: number): Observable<Cart> {
    return this.obtenerCarritoMasReciente(userId).pipe(
      catchError(err => {
        console.error('Error al obtener el carrito más reciente:', err);
        return throwError(err);
      }),
      mergeMap(carritoMasReciente => {
        const updatedProducts = [...carritoMasReciente.products, newProduct];
        const updatedCart = {
          ...carritoMasReciente,
          products: updatedProducts,
          userId: userId
        };
        
        const url = updatedCart.id ? `${this.apiUrl}/${updatedCart.id}` : `${this.apiUrl}`;
        console.log('Body del carrito actualizado:', updatedCart);
        return this.http.request<Cart>(updatedCart.id ? 'PUT' : 'POST', url, { body: updatedCart }).pipe(
          catchError((err: any) => {
            console.error('Error al agregar producto al carrito más reciente:', err);
            return throwError(err);
          })
        );
      })
    );
  }

  eliminarProductoDelCarritoMasReciente(productId: number, userId: number): Observable<Cart> {
    return this.obtenerCarritoMasReciente(userId).pipe(
      catchError(err => {
        console.error('Error al obtener el carrito más reciente:', err);
        return throwError(err);
      }),
      mergeMap(carritoMasReciente => {
        const updatedProducts = carritoMasReciente.products.filter(product => product.productId !== productId);
        const updatedCart = {
          ...carritoMasReciente,
          products: updatedProducts,
          userId: userId
        };

        const url = updatedCart.id ? `${this.apiUrl}/${updatedCart.id}` : `${this.apiUrl}`;
        console.log('Body del carrito actualizado:', updatedCart);
        return this.http.request<Cart>(updatedCart.id ? 'PUT' : 'POST', url, { body: updatedCart }).pipe(
          catchError((err: any) => {
            console.error('Error al eliminar producto del carrito más reciente:', err);
            return throwError(err);
          })
        );
      })
    );
  }

}
