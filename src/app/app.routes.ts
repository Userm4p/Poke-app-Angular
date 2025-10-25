import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pokedex',
    loadComponent: () =>
      import('./views/pokedex/pokedex.component').then((m) => m.PokedexComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./views/pokemon-detail/pokemon-detail').then((m) => m.PokemonDetail),
    canActivate: [AuthGuard],
  },
  {
    path: 'types',
    loadComponent: () => import('./views/types/types.component').then((m) => m.TypesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'regions',
    loadComponent: () =>
      import('./views/regions/regions.component').then((m) => m.RegionsComponent),
    canActivate: [AdminGuard],
  },
  {
    path: 'moves',
    loadComponent: () => import('./views/moves/moves.component').then((m) => m.MovesComponent),
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
