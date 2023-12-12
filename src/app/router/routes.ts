import { Routes } from '@angular/router';
import { EditorialesComponent } from '../pages/editoriales/editoriales.component';
import { LoginComponent } from '../pages/login/login.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { inject } from '@angular/core';

export const canActivate = (authGuard: AuthGuardService = inject(AuthGuardService)) => authGuard.isLoggedIn();

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'editoirales',
    component: EditorialesComponent,
    canActivate: [() => canActivate()],
  },
  { path: '**', component: NotFoundComponent },
];
