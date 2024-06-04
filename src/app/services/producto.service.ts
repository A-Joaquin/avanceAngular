import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  obtenerTodosLosProductos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      rxMap((productos: Product[]) => productos.reverse())
    );
  }

  obtenerProductoPorId(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  eliminarProductoPorId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  agregarProducto(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  actualizarProducto(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  modificarProducto(id: number, partialProduct: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, partialProduct, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
