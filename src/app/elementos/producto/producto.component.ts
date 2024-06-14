import { Component, Input ,inject,Output,EventEmitter} from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { TiendaComponent } from '../../paginas/tienda/tienda.component';
import { Juego } from '../../interfaces/juegos/juego';
@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink,TiendaComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Output() productoEliminado = new EventEmitter<number>();
  @Input() producto!:Juego; //Que es?
  productosService: ProductoService = inject(ProductoService);
  router: Router=inject(Router);
  productos: Juego[] = [];
  constructor()
  {
  }

  borrarProducto(id: number) {
    this.productosService.eliminarProductoPorId(id).subscribe(() => {
      this.productoEliminado.emit(id);  
    });
  }
}
