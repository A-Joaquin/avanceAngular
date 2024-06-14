import { Component,Input,OnInit, inject, input,Output,EventEmitter } from '@angular/core';
import { Cart,JuegoCart } from '../../interfaces/juegos/carrito';
import { CarritoService } from '../../services/ServiceCarrito/carrito.service';
import { ProductoService } from '../../services/producto.service';
import { ProductoComponent } from '../producto/producto.component';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/juegos/user';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { Juego } from '../../interfaces/juegos/juego';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductoComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  @Output() productoEliminado = new EventEmitter<number>();
  @Input() productCart!: JuegoCart;
  detalleDelProducto!: Juego;
  productosService: ProductoService=inject(ProductoService);
  cartService: CarritoService=inject(CarritoService);
  userService:AuthService=inject(AuthService);
  constructor() {}

  ngOnInit(): void {
    // Llamar a la función obtenerDetalleProducto en el ngOnInit para inicializar el detalle del producto
    if (this.productCart) {
      console.log(this.productCart);
      this.obtenerDetalleProducto(this.productCart.juegoId);
    }
  }

  obtenerDetalleProducto(id: number): void {
    this.productosService.obtenerProductoPorId(id).subscribe(
      (data: Juego) => {
        this.detalleDelProducto = data;
      },
      (error) => {
        console.error('Error al obtener el detalle del producto:', error);
      }
    );
  }

  eliminarProductoCarrito(): void {
    let idUser = this.userService.getUserIdFromToken();
    if (idUser !== null) {
      this.cartService.eliminarProductoDelCarritoMasReciente(this.detalleDelProducto.id, idUser).subscribe(
        (updatedCart: Cart) => {
          this.productoEliminado.emit(this.detalleDelProducto.id); 
          console.log('Producto eliminado del carrito:', updatedCart);
          alert("Se elimino el producto del carrito");
          // Aquí puedes actualizar el estado de tu componente, como volver a cargar el carrito
        },
        (error: any) => {
          console.error('Error al eliminar el producto del carrito:', error);
        }
      );
    } else {
      console.error('El userId es nulo, no se puede eliminar el producto del carrito.');
    }
  }
}