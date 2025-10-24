import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isLoggedIn = false;
  @Input() isOpen = signal(false);

  menuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/dashboard' },
    { icon: '📚', label: 'Pokédex', route: '/pokedex' },
    { icon: '⚔️', label: 'Tipos y fortalezas', route: '/types' },
    { icon: '🌍', label: 'Regiones y generaciones', route: '/regions' },
    { icon: '💥', label: 'Movimientos', route: '/moves' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isOpen.set(false);
  }
}
