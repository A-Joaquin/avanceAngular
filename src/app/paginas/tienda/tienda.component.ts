import { Component, OnInit, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [ProductoComponent,CommonModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit{

  usuario: string = '';
  listaDeProductos: Product[] = [];
  productosService: ProductoService = inject(ProductoService);
  authService:AuthService=inject(AuthService);
  constructor() {

  }
  ngOnInit(): void {
    this.productosService.obtenerTodosLosProductos().subscribe(
      data => {
        this.listaDeProductos = data;
      },
      error => console.log("Hubo un error:", error),
      () => console.log("Finalizado")
    );

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
}