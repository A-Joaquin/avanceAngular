import { Component, OnInit, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { CommonModule } from '@angular/common';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { Juego } from '../../interfaces/juegos/juego';
@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [ProductoComponent,CommonModule,AgregarProductoComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit{

  isAuthenticated: boolean=false;
  isNoAuthenticated: boolean=false;
  usuario: string = '';
  listaDeProductos: Juego[] = [];
  productosService: ProductoService = inject(ProductoService);
  authService:AuthService=inject(AuthService);
  constructor() {

  }
  ngOnInit(): void {

    this.isAuthenticated = this.authService.isAuthenticated();
    this.isNoAuthenticated = this.authService.isNoAuthenticated();

    this.cargarProductos();

    const userId = this.authService.getUserIdFromToken();
    if (userId !== null) {
      this.authService.getUserDetails(userId).subscribe(
        user => {
          this.usuario = `${user.name.firstname} ${user.name.lastname}`;
        },
        error => console.error('Error al obtener los detalles del usuario', error)
      );
    }
  }
  cargarProductos():void{
    this.productosService.obtenerTodosLosProductos().subscribe(
      data => {
        this.listaDeProductos = data;
      },
      error => console.log("Hubo un error:", error),
      () => console.log("Finalizado")
    );
  }

  onProductoAgregado(nuevoProducto: Juego): void {
    this.cargarProductos();
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
  manejarProductoEliminado(id: number): void {
    this.cargarProductos();
  }
  

}

