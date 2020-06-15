import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'student',
    pathMatch: 'full'
  },
  {
    path: 'student',
    loadChildren: './core/pages/student/student.module#StudentModule',

  },
  {
    path: 'class',
    loadChildren: './core/pages/class/class.module#ClassModule',
    canActivate: [AuthenticationService]
  },
  {
    path: 'class-reservation',
    loadChildren: './core/pages/class-reservation/class.reservation.module#ClassReservationPageModule'
  },
  {
    path: 'login',
    loadChildren: './core/pages/login/login.module#LoginPageModule'
  },
  {
    path: 'storage',
    loadChildren: './core/pages/storage/storage.module#StoragePageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
