import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  obtenerTodosLosProductos(): Observable<Product[]>
  {
    return this.http.get<Product[]>("https://fakestoreapi.com/products").pipe(
      rxMap((productos: Product[]) => productos.reverse())
    ); //esto es un observable.
  }
  obtenerProductoPorId(id:number)
  {
    return this.http.get<Product>("https://fakestoreapi.com/products/" + id, {});
  }

  eliminarProductoPorId(id: number): Observable<any> {
    return this.http.delete('https://fakestoreapi.com/products/' + id, {});
  }

//   agregarProductoPorId(id: number): Observable<any> {
//     return this.http.post('https://fakestoreapi.com/products/' + id, {});
// }
  agregarProductoPorId(product: Product): Observable<Product> {
    return this.http.post<Product>('https://fakestoreapi.com/products/', product);
  }

}
