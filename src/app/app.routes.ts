import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { TiendaComponent } from './paginas/tienda/tienda.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { ContactanosComponent } from './paginas/contactanos/contactanos.component';
import { PaginaNoEncontradaComponent } from './paginas/pagina-no-encontrada/pagina-no-encontrada.component';
import { DetallesComponent } from './paginas/detalles/detalles.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'detalles/:id', component: DetallesComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'contactanos', component: ContactanosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: PaginaNoEncontradaComponent }
];
