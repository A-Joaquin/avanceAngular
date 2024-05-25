import { Component, Input ,inject} from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { TiendaComponent } from '../../paginas/tienda/tienda.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink,TiendaComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Input() producto!:Product; //Que es?
  productosService: ProductoService = inject(ProductoService);
  
  productos: Product[] = [];
  constructor()
  {
  }
  borrarProducto(id: number) {
    this.productosService.eliminarProductoPorId(id).subscribe(() => {
      // Una vez que se elimina el producto, actualizamos la lista de productos
      this.productosService.obtenerTodosLosProductos().subscribe(productos => {
        this.productos = productos;
      });
    });
  }
}
