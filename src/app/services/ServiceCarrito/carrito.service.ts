import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../interfaces/juegos/carrito';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://127.0.0.1:5000/carritos';

  constructor(private http: HttpClient) { }
  obtenerTodosLosCarritos(): Observable<Cart[]>
  {
    return this.http.get<Cart[]>(this.apiUrl); //esto es un observable.
  }
  obtenerCarritoPorId(id:number)
  {
    return this.http.get<Cart>(this.apiUrl + id);
  }
  eliminarCarritoPorId(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
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
    return this.http.get<Cart[]>(`http://127.0.0.1:5000/carritos/usuario/${userId}`);
  }


  obtenerCarritoMasReciente(userId: number): Observable<Cart | null> {
    return this.obtenerCarritosDeUsuario(userId).pipe(
      map(carritos => {
        if (carritos.length === 0) {
          return null; // No hay carritos para este usuario
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

  crearCarrito(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart).pipe(
      catchError(err => {
        console.error('Error al crear carrito:', err);
        return throwError(err);
      })
    );
  }

  agregarProductoAlCarritoMasReciente(newProduct: { productId: number, quantity: number }, userId: number): Observable<Cart> {
    return this.obtenerCarritoMasReciente(userId).pipe(
      mergeMap(carritoMasReciente => {
        if (!carritoMasReciente) {
          // Si no hay carrito, crearlo
          const newCart: Cart = {
            id: 0, // Asume que el backend generará este valor
            userId: userId,
            products: [{ juegoId: newProduct.productId, quantity: newProduct.quantity }]
          };
          return this.crearCarrito(newCart);
        }

        // Eliminar _id antes de enviar la solicitud
        const { _id, ...cartDataWithoutId } = carritoMasReciente;

        const updatedProducts = [...cartDataWithoutId.products, { juegoId: newProduct.productId, quantity: newProduct.quantity }];
        const updatedCart = {
          ...cartDataWithoutId,
          products: updatedProducts
        };

        console.log("Carrito actualizado sin _id:", updatedCart);

        const url = `${this.apiUrl}/${cartDataWithoutId.id}`;
        console.log('Enviando datos al endpoint:', url);

        return this.http.put<Cart>(url, updatedCart).pipe(
          catchError(err => {
            console.error('Error al agregar producto al carrito más reciente:', err);
            return throwError(err);
          })
        );
      }),
      catchError(err => {
        console.error('Error en el proceso de agregar producto al carrito:', err);
        return throwError(err);
      })
    );
  }

  
  

  eliminarProductoDelCarritoMasReciente(productId: number, userId: number): Observable<Cart> {
    return this.obtenerCarritoMasReciente(userId).pipe(
        mergeMap(carritoMasReciente => {
            if (carritoMasReciente === null) {
                // Manejar el caso cuando no hay carrito reciente para el usuario
                return throwError(new Error('No hay carritos para este usuario.'));
            }

            const updatedProducts = carritoMasReciente.products.filter(product => product.juegoId !== productId);
            const { _id, ...cartDataWithoutId } = carritoMasReciente; // Eliminar _id

            const updatedCart = {
                ...cartDataWithoutId,
                products: updatedProducts,
                userId: userId
            };

            console.log(updatedCart);

            const url = `${this.apiUrl}/${cartDataWithoutId.id}`;
            return this.http.put<Cart>(url, updatedCart).pipe(
                catchError(err => {
                    console.error('Error al eliminar producto del carrito más reciente:', err);
                    return throwError(err);
                })
            );
        }),
        catchError(err => {
            console.error('Error en el proceso de eliminar producto del carrito:', err);
            return throwError(err);
        })
    );
}


}
