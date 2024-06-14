import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/serviceUsuario/usuario.service';
import { User } from '../../interfaces/juegos/user';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsuarioService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
      const newUser: Omit<User, 'id'> = {
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
        name: {
          firstname: formValues.firstname,
          lastname: formValues.lastname
        },
        address: {
          city: formValues.city,
          street: formValues.street,
          number: Number(formValues.number),
          zipcode: formValues.zipcode 
        },
        phone: formValues.phone
      };

      this.userService.agregarUsuario(newUser).subscribe(
        response => {
          console.log('User registered successfully', response);
          alert("Se registro el usuario");
        },
        error => {
          console.error('There was an error!', error);
        }
      );
    }
  }
}
