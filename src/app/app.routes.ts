import { Routes } from '@angular/router';
import { InicioComponent } from '../app/component/pages/inicio/inicio.component';
import { LoginComponent } from '../app/component/pages/login/login.component';
import { RegisterComponent } from '../app/component/pages/register/register.component';
import { NoticiasComponent } from './component/pages/noticias/noticias.component';
import { ExerciseComponent } from './component/pages/exercise/exercise.component';
import { ExerciseUbicationComponent } from './component/pages/exercise-ubication/exercise-ubication.component';
import { ExerciseLevelBasicomponent } from './component/pages/exercise-level-basic/exercise-level-basic.component';
import path from 'path';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticias', component: NoticiasComponent },
  {path: 'exercise', component:ExerciseComponent},
  {path: 'exercise-ubication', component:ExerciseUbicationComponent},
  {path: 'exercise-level-basic', component:ExerciseLevelBasicomponent},
  { path: '**', redirectTo: '' }  // Redirect any unknown paths to Inicio
];
