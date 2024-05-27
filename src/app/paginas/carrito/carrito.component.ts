import { Component,OnInit, inject } from '@angular/core';
import { Cart } from '../../interfaces/cart';
import { CarritoService } from '../../services/ServiceCarrito/carrito.service';
import { CartComponent } from '../../elementos/cart/cart.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/serviceAuth/auth.service';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CartComponent,CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {
  carritos:Cart[]=[];
  carritoService: CarritoService=inject(CarritoService);
  authService:AuthService=inject(AuthService);

  constructor()
  {

  }
  ngOnInit():void {


    this.carritoService.obtenerCarritosDeUsuario(this.obteneridUsuario()).subscribe(
      data => {
        this.carritos = data;
      },
      error => console.log("Hubo un error:", error),
      () => console.log("Finalizado")
    );
  }

  obteneridUsuario(){
    return this.authService.getUser().id;
  }

}
