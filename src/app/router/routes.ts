import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { inject } from '@angular/core';
import { EquiposComponent } from '@pages/equipos/equipos.component';

export const canActivate = (authGuard: AuthGuardService = inject(AuthGuardService)) => authGuard.isLoggedIn();

export const routes: Routes = [
  { path: '', redirectTo: '/equipos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'equipos',
    component: EquiposComponent,
    canActivate: [() => canActivate()],
  },

  { path: '**', component: NotFoundComponent },
];
