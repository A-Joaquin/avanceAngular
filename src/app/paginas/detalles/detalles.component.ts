import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';

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
  detalleDelProducto!: Product;
  constructor()
  {
    console.log(this.route.snapshot.params)
    const idProducto=Number(this.route.snapshot.params['id']);
    this.productoService.obtenerProductoPorId(idProducto).subscribe(
      data=>this.detalleDelProducto=data

    )
  }

}
