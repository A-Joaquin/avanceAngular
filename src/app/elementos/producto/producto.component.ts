import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  @Input() producto!:Product; //Que es?
}
