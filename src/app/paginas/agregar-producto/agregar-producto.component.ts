import { Component, Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { Product2} from '../../interfaces/product2';
import { Product} from '../../interfaces/product';
import { Juego } from '../../interfaces/juegos/juego';
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule]
})
export class AgregarProductoComponent implements OnInit {
  @Output() productoAgregado = new EventEmitter<Juego>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductoService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]], // Acepta enteros y decimales
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''], // Puedes agregar validaciones adicionales aquí si es necesario
      rating: this.fb.group({
        rate: [0, Validators.required],
        count: [0, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    // Verifica si necesitas inicializar alguna lógica específica
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValues = this.productForm.value;

      // Convertir price, rate y count a números
      const newProduct: Juego = {
        id: 0, // Asume que el backend generará este valor
        title: formValues.title,
        price: parseFloat(formValues.price), // parseFloat para manejar decimales
        description: formValues.description,
        category: formValues.category,
        image: formValues.image,
        rating: {
          rate: parseFloat(formValues.rating.rate),
          count: parseFloat(formValues.rating.count)
        }
      };

      this.productService.agregarProducto(newProduct).subscribe(
        (response: Juego) => {  
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