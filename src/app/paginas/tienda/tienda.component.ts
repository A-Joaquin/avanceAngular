import { Component, OnInit, inject } from '@angular/core';
import { ProductoComponent } from '../../elementos/producto/producto.component';
import { Product } from '../../interfaces/product';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [ProductoComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit{
  listaDeProductos: Product[] = [];
  productosService: ProductoService = inject(ProductoService);

  constructor() {

  }
  ngOnInit(): void {
    this.productosService.obtenerTodosLosProductos().subscribe(
      data => {
        this.listaDeProductos = data.reverse().slice(0,3);
      },
      error => console.log("Hubo un error:", error),
      () => console.log("Finalizado")
    );
  }
  
  

}

