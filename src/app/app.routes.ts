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

/*nivel intermedio */
import { ExerciserutinesinterComponent } from './pages/exercise-intermedio/exercise-rutines-intermedio/exercise-rutines-inter.component';
import { ExerciseLevelinteromponent } from './pages/exercise-intermedio/exercise-level-inter/exercise-level-inter';
import { ExerciseinterUbicationComponent } from './pages/exercise-intermedio/exercise-interubication/exercise-interubication.component';
import { Exerciselevelgymomponent } from './pages/exercise-intermedio/exercise-level-gym/exercise-gym-inter.component';


import path from 'path';
import { importProvidersFrom } from '@angular/core';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticias', component: NoticiasComponent },
  {path: 'exercise', component:ExerciseComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'home', component:HomeComponent},
  {path: 'search', component:searchComponent},
  /*nivel basico */
  {path: 'exercise-ubication', component:ExerciseUbicationComponent},
  {path: 'exercise-level-basic', component:ExerciseLevelBasicomponent},
  {path: 'exercise-rutines', component:ExerciserutinesComponent},
/*nivel intermedio */
{path: 'exercise-interubication', component:ExerciseinterUbicationComponent},
{path: 'exercise-level-inter', component:ExerciseLevelinteromponent},
{path: 'exercise-rutines-inter', component:ExerciserutinesinterComponent},
{path: 'exercise-level-gym', component:Exerciselevelgymomponent},




  { path: '**', redirectTo: '' }  // Redirect any unknown paths to Inicio
];
