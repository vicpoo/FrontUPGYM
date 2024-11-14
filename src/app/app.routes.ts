import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ExerciseUbicationComponent } from './pages/exercise-ubication/exercise-ubication.component';
import { ExerciseLevelBasicomponent } from './pages/exercise-level-basic/exercise-level-basic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { searchComponent } from './pages/Search/Search.component';
import { ExerciserutinesComponent } from './pages/exercise-rutines/exercise-rutines.component';
import path from 'path';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticias', component: NoticiasComponent },
  {path: 'exercise', component:ExerciseComponent},
  {path: 'exercise-ubication', component:ExerciseUbicationComponent},
  {path: 'exercise-level-basic', component:ExerciseLevelBasicomponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'home', component:HomeComponent},
  {path: 'search', component:searchComponent},
  {path: 'exercise-rutines', component:ExerciserutinesComponent},

  { path: '**', redirectTo: '' }  // Redirect any unknown paths to Inicio
];
