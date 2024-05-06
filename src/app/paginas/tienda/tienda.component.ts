import { Component, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';
@Component({ //Tiene como parametro un objeto.
  selector: 'app-tienda',
  standalone: true,
  imports: [ProductoComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent {

  listaDeProductos: Product[]=[];
  productosService: ProductoService=inject(ProductoService);
  constructor()
  {
    this.listaDeProductos=this.productosService.obtenerTodosLosProductos();
  }
  /*constructor(private productoService:ProductoService)// Otra forma.
  {
    this.productoService.obtenerTodosLosProductos();
  }*/
}
