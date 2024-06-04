import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/ServiceCarrito/carrito.service';
import { AuthService } from '../../services/serviceAuth/auth.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class DetallesComponent {
  route: ActivatedRoute=inject(ActivatedRoute)
  productoService: ProductoService=inject(ProductoService);
  carritoService: CarritoService=inject(CarritoService);
  authService:AuthService=inject(AuthService);
  detalleDelProducto!: Product;
  constructor()
  {
    console.log(this.route.snapshot.params)
    const idProducto=Number(this.route.snapshot.params['id']);
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data=>this.detalleDelProducto=data

    )
  }
  aniadirCarrito() {
    const newProduct = {
      productId: this.detalleDelProducto.id,
      quantity: 1 // Puedes ajustar la cantidad según necesites
    };
    const userId =this.authService.getUser().id;

    this.carritoService.agregarProductoAlCarritoMasReciente(newProduct, userId).subscribe(
      () => {
        console.log('Producto agregado al carrito exitosamente.');
        alert("Producto añadido al carrito");
        // Aquí puedes agregar lógica adicional después de agregar el producto al carrito, como redireccionar al carrito o mostrar un mensaje de éxito
      },
      error => {
        console.error('Error al agregar producto al carrito:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    );
  }

}
