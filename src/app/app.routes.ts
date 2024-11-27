import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { searchComponent } from './pages/Search/Search.component';
import { AuthGuard } from './guards/auth.guard';

/*RUTAS DEL ejercicios usuario) */
import { ExercisebasicoComponent } from './pages/exercise-Basic/Exercise-basico.component';
import { ExerciseIntermedioComponent } from './pages/exercise-intermedio/Exercise-intermedio.component';

import { NoticiaDetalleComponent } from './component/noticia-detalle/noticia-detalle.component';

/*RUTAS DEL ADMIN (NO BORRAR Y SI ES PARA TI VICTOR) */
import { NoticiasAdminComponent } from './pages/Admin-views/noticias-admin/noticias-admin.component';
import { ProfileadminComponent } from './pages/Admin-views/profiles-admin/profile-admin.component';
import { PremiumAdminComponent } from './pages/Admin-views/Premium-admin/Premium-admin.component';
import { HomeAdminComponent } from './pages/Admin-views/Home-admin/home-admin.component';
  /*RUTAS DEL Ejercicio ADMIN (no borres) */
import { ExerciseAdminLevelComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-level.component';
import { ExerciseAdminBasicComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-basic/Exercise-admin-basic-rutines/Exercise-admin-rutines.component';
import { ExerciseAdminInterComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-intermedio/Exercise-admin-intermedio-rutines/Exercise-admin-inter-rutines';
import { ExerciseAdminUbicasionComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-avanzado/Exercise-admin-avanzado.component';
import { ExerciseAdminAvanzadoCasaComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-avanzado/Exercise-admin-casa/Exercise-admin-avanzado-casa.component';
import { ExerciseAdminAvanzadoGymComponent } from './pages/Admin-views/Exercise-admin/Exercise-admin-avanzado/Exercise-admin-gym/Exercise-admin-avanzado-gym.component';

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
  { path: 'noticia-detalle/:id', component: NoticiaDetalleComponent, canActivate: [AuthGuard] },

  { path: 'ExerciseBasico', component: ExercisebasicoComponent, canActivate: [AuthGuard] },
  { path: 'ExerciseIntermedio', component: ExerciseIntermedioComponent, canActivate: [AuthGuard] },



  /*RUTAS DEL ADMIN (NO BORRAR Y SI ES PARA TI VICTOR) */
  { path: 'noticias-admin', component: NoticiasAdminComponent, canActivate: [AuthGuard] },
  { path: 'profile-admin', component: ProfileadminComponent, canActivate: [AuthGuard] },
  { path: 'premium-admin', component: PremiumAdminComponent, canActivate: [AuthGuard] },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'anuncios', component: AnuncioFormComponent, canActivate: [AuthGuard]},

  /*RUTAS DEL Ejercicio ADMIN (no borres) */
  { path: 'Exercise-admin-level', component: ExerciseAdminLevelComponent, canActivate: [AuthGuard] },
  { path: 'Exercise-admin-basic', component: ExerciseAdminBasicComponent, canActivate: [AuthGuard]},
  { path: 'Exercise-admin-inter', component: ExerciseAdminInterComponent, canActivate: [AuthGuard]},
  { path: 'Exercise-admin-avan', component: ExerciseAdminUbicasionComponent, canActivate: [AuthGuard]},
  { path: 'Exercise-admin-avan-casa', component: ExerciseAdminAvanzadoCasaComponent, canActivate: [AuthGuard]},
  { path: 'Exercise-admin-avan-gym', component: ExerciseAdminAvanzadoGymComponent, canActivate: [AuthGuard]},



  /*RUTAS DEL USUARIO PREMIUM NO BORRES DENZEL*/
    /*JAJAJAJAJJAA QUE LO BORRE Y LO PEGUE CON LO DEMAS DICE JAJAJAJAJJAJAJAJAJJAJAJJAJAJAJAAJAJJAJAJAJAJJAJAJJAJAJAJAJAAAJJJJAJ*/

  { path: 'grasa', component: PorcentajeGrasaComponent, canActivate:[AuthGuard]},



  { path: '**', redirectTo: '' } 
];
