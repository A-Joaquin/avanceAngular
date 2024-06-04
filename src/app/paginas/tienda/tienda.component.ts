import { Component, OnInit, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { CommonModule } from '@angular/common';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, AgregarProductoComponent, ProductoComponent],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})

export class TiendaComponent implements OnInit {
  usuario: string = '';
  listaDeProductos: Product[] = [];
  productoService: ProductoService;
  authService: AuthService;

  constructor(productoService: ProductoService, authService: AuthService) {
    this.productoService = productoService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.productoService.obtenerTodosLosProductos().subscribe(
      data => {
        this.listaDeProductos = data;
      },
      error => console.log('Hubo un error:', error),
      () => console.log('Finalizado')
    );

    const userId = this.authService.getUserIdFromToken();
    if (userId !== null) {
      this.authService.getUserDetails(userId).subscribe(user => {
        this.usuario = `${user.name.firstname} ${user.name.lastname}`;
      });
    }
  }

  onProductoAgregado(nuevoProducto: Product): void {
    this.listaDeProductos.push(nuevoProducto);
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}

