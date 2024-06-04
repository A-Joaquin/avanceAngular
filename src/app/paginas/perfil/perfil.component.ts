import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/serviceUsuario/usuario.service';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  usuarioService: UsuarioService = inject(UsuarioService);
  authService: AuthService = inject(AuthService);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router=inject(Router);
  errorMessage: string = '';

  constructor() {
    this.perfilForm = this.formBuilder.group({
      email: [''],
      username: [''],
      password: [''],
      firstname: [''],
      lastname: [''],
      city: [''],
      street: [''],
      number: [''],
      zipcode: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId !== null) {
      this.usuarioService.obtenerUsuarioPorId(userId).subscribe(
        user => {
          this.perfilForm.patchValue({
            email: user.email,
            username: user.username,
            password: user.password,
            firstname: user.name.firstname,
            lastname: user.name.lastname,
            city: user.address.city,
            street: user.address.street,
            number: user.address.number,
            zipcode: user.address.zipcode,
            phone: user.phone
          });
        },
        error => {
          console.error('Error al obtener los detalles del usuario', error);
          this.errorMessage = 'Error al obtener los detalles del usuario';
        }
      );
    }
  }

  actualizarPerfil() {
    if (this.perfilForm.valid) {
      const userId = this.authService.getUserIdFromToken();
      if (userId !== null) {
        const updatedUser: User = {
          ...this.perfilForm.value,
          id: userId,
          name: {
            firstname: this.perfilForm.value.firstname,
            lastname: this.perfilForm.value.lastname
          },
          address: {
            city: this.perfilForm.value.city,
            street: this.perfilForm.value.street,
            number: this.perfilForm.value.number,
            zipcode: this.perfilForm.value.zipcode,
            geolocation: {
              lat: '', // Add appropriate value
              long: '' // Add appropriate value
            }
          }
        };

        this.usuarioService.actualizarUsuario(userId, updatedUser).subscribe(
          updatedUser => {
            console.log('Usuario actualizado:', updatedUser);
            alert("Se actualizo el perfil");
            this.router.navigate(['/vista-perfil']);
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
            this.errorMessage = 'Error al actualizar el usuario';
          }
        );
      }
    }
  }
}
