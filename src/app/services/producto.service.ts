import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { Product2 } from '../interfaces/product2';
import { Juego } from '../interfaces/juegos/juego';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private apiUrl2 = 'http://localhost:5000/juegos';
  constructor(private http: HttpClient) { }

  obtenerTodosLosProductos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.apiUrl2}`);
  }

  obtenerProductoPorId(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.apiUrl2}/${id}`);
  }

  eliminarProductoPorId(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/${id}`);
  }

  agregarProducto(product: Juego): Observable<Juego> {
    return this.http.post<Juego>(`${this.apiUrl2}`, product);
  }

  actualizarProducto(id: number, product: Juego): Observable<Juego> {
    return this.http.put<Juego>(`${this.apiUrl2}/${id}`, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  modificarProducto(id: number, partialProduct: Partial<Juego>): Observable<Juego> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, partialProduct, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
