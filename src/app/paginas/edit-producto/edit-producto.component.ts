import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {
  editForm!: FormGroup;
  productId!: number;
  productoService: ProductoService = inject(ProductoService);
  formBuilder: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      rate: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      count: ['', [Validators.required, Validators.min(0)]]
    });

    this.productoService.obtenerProductoPorId(this.productId).subscribe(product => {
      this.editForm.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rate: product.rating.rate,
        count: product.rating.count
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedProduct: Product = {
        ...this.editForm.value,
        id: this.productId,
        rating: {
          rate: this.editForm.value.rate,
          count: this.editForm.value.count
        }
      };

      this.productoService.actualizarProducto(this.productId, updatedProduct).subscribe(
        () => {
          console.log('Product updated successfully');
          this.router.navigate(['/productos']); // Ruta de ejemplo, cambia según tu configuración
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    }
  }
}
