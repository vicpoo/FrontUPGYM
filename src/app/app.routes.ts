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
import { ExerciserutinesinterComponent } from './pages/exercise-intermedio/exercise-rutines-intermedio/exercise-rutines-inter.component';
import { ExerciseLevelinteromponent } from './pages/exercise-intermedio/exercise-level-inter/exercise-level-inter';
import { ExerciseinterUbicationComponent } from './pages/exercise-intermedio/exercise-interubication/exercise-interubication.component';
import { Exerciselevelgymomponent } from './pages/exercise-intermedio/exercise-level-gym/exercise-gym-inter.component';
import { AuthGuard } from './guards/auth.guard';

import { NoticiaDetalleComponent } from './component/noticia-detalle/noticia-detalle.component';

/*RUTAS DEL ADMIN (NO BORRAR Y SI ES PARA TI VICTOR) */
import { NoticiasAdminComponent } from './pages/Admin-views/noticias-admin/noticias-admin.component';
import { ProfileadminComponent } from './pages/Admin-views/profiles-admin/profile-admin.component';
import { PremiumAdminComponent } from './pages/Admin-views/Premium-admin/Premium-admin.component';
import { HomeAdminComponent } from './pages/Admin-views/Home-admin/home-admin.component';
  /*RUTAS DEL Ejercicio ADMIN (no borres) */
import { ExerciseAdminLevelComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-level.component';


/*RUTAS DEL USUARIO PREMIUM NO BORRES DENZEL*/
import { PorcentajeGrasaComponent } from './pages/Premium-views/PorcentajeGrasa/porcentaje-grasa.component';
import { AnuncioFormComponent } from './pages/Admin-views/Anuncio-admin/anuncio-form.component';


export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticias', component: NoticiasComponent, canActivate: [AuthGuard]},
  { path: 'exercise', component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'search', component: searchComponent, canActivate: [AuthGuard] },
  { path: 'exercise-ubication', component: ExerciseUbicationComponent, canActivate: [AuthGuard] },
  { path: 'exercise-level-basic', component: ExerciseLevelBasicomponent, canActivate: [AuthGuard] },
  { path: 'exercise-rutines', component: ExerciserutinesComponent, canActivate: [AuthGuard] },
  { path: 'exercise-interubication', component: ExerciseinterUbicationComponent, canActivate: [AuthGuard] },
  { path: 'exercise-level-inter', component: ExerciseLevelinteromponent, canActivate: [AuthGuard] },
  { path: 'exercise-rutines-inter', component: ExerciserutinesinterComponent, canActivate: [AuthGuard] },
  { path: 'exercise-level-gym', component: Exerciselevelgymomponent, canActivate: [AuthGuard] },
  { path: 'noticia-detalle/:id', component: NoticiaDetalleComponent, canActivate: [AuthGuard] },



  /*RUTAS DEL ADMIN (NO BORRAR Y SI ES PARA TI VICTOR) */
  { path: 'noticias-admin', component: NoticiasAdminComponent, canActivate: [AuthGuard] },
  { path: 'profile-admin', component: ProfileadminComponent, canActivate: [AuthGuard] },
  { path: 'premium-admin', component: PremiumAdminComponent, canActivate: [AuthGuard] },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'anuncios', component: AnuncioFormComponent, canActivate: [AuthGuard]},

  /*RUTAS DEL Ejercicio ADMIN (no borres) */
  { path: 'Exercise-admin-level', component: ExerciseAdminLevelComponent, canActivate: [AuthGuard] },




  /*RUTAS DEL USUARIO PREMIUM NO BORRES DENZEL*/
    /*JAJAJAJAJJAA QUE LO BORRE Y LO PEGUE CON LO DEMAS DICE JAJAJAJAJJAJAJAJAJJAJAJJAJAJAJAAJAJJAJAJAJAJJAJAJJAJAJAJAJAAAJJJJAJ*/

  { path: 'grasa', component: PorcentajeGrasaComponent, canActivate:[AuthGuard]},



  { path: '**', redirectTo: '' } 
];
