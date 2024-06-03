import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/serviceUsuario/usuario.service';
import { AuthService } from '../../services/serviceAuth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vista-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './vista-perfil.component.html',
  styleUrl: './vista-perfil.component.scss'
})
export class VistaPerfilComponent implements OnInit{
  perfilForm: FormGroup;
  usuarioService: UsuarioService = inject(UsuarioService);
  authService: AuthService = inject(AuthService);
  formBuilder: FormBuilder = inject(FormBuilder);
  errorMessage: string = '';

  constructor() {
    this.perfilForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      firstname: [{ value: '', disabled: true }],
      lastname: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      number: [{ value: '', disabled: true }],
      zipcode: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }]
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
}
