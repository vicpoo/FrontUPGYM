import { Routes } from '@angular/router';
import { InicioComponent } from '../app/component/pages/inicio/inicio.component';
import { LoginComponent } from '../app/component/pages/login/login.component';
import { RegisterComponent } from '../app/component/pages/register/register.component';
import { NoticiasComponent } from './component/pages/noticias/noticias.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: '**', redirectTo: '' }  // Redirect any unknown paths to Inicio
];
