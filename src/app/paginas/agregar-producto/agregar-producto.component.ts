import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../interfaces/product';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]
})
export class AgregarProductoComponent {
  @Output() productoAgregado = new EventEmitter<Product>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductoService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''], // Puedes agregar validaciones adicionales aquí si es necesario
      rating: this.fb.group({
      rate: [0, Validators.required],
      count: [0, Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: 0, // Asume que el backend generará este valor
        ...this.productForm.value,
        rating: { rate: 0, count: 0 } // Agrega un valor predeterminado para rating
      };

      this.productService.agregarProductoPorId(newProduct).subscribe(
        (response: Product) => {
          console.log('Producto agregado:', response);
          this.productoAgregado.emit(response);
        },
        (error: any) => {
          console.error('Error al agregar producto:', error);
        }
      );
    }
  }
}
