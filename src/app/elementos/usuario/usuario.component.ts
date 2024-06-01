import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UsuarioService } from '../../services/serviceUsuario/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  @Input() usuario!: User;
  usuarioService: UsuarioService = inject(UsuarioService);

  constructor() {}

  ngOnInit(): void {
    if (this.usuario && this.usuario.id) {
      this.obtenerDetallesUsuario(this.usuario.id);
    }
  }

  obtenerDetallesUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      (data: User) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    );
  }

  actualizarUsuario(): void {
    this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe(
      (data: User) => {
        this.usuario = data;
        console.log('Usuario actualizado:', data);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
