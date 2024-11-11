import { Routes } from '@angular/router';
import { InicioComponent } from '../app/component/pages/inicio/inicio.component';
import { LoginComponent } from '../app/component/pages/login/login.component';
import { RegisterComponent } from '../app/component/pages/register/register.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }  // Redirect any unknown paths to Inicio
];
