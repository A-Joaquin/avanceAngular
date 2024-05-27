import { Component,Input,OnInit, inject, input } from '@angular/core';
import { Cart, ProductCart } from '../../interfaces/cart';
import { CarritoService } from '../../services/ServiceCarrito/carrito.service';
import { ProductoService } from '../../services/producto.service';
import { ProductoComponent } from '../producto/producto.component';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductoComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  @Input() productCart!: ProductCart;
  detalleDelProducto!: Product;

  constructor(private productosService: ProductoService) {}

  ngOnInit(): void {
    // Llamar a la función obtenerDetalleProducto en el ngOnInit para inicializar el detalle del producto
    if (this.productCart) {
      this.obtenerDetalleProducto(this.productCart.productId);
    }
  }

  obtenerDetalleProducto(id: number): void {
    this.productosService.obtenerProductoPorId(id).subscribe(
      (data: Product) => {
        this.detalleDelProducto = data;
      },
      (error) => {
        console.error('Error al obtener el detalle del producto:', error);
      }
    );
  }
}