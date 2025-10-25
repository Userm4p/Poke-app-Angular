import { Component, Input, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isLoggedIn = false;
  @Input() isOpen = signal(false);

  private allMenuItems = [
    { icon: '🏠', label: 'Dashboard', route: '/dashboard' },
    { icon: '📚', label: 'Pokédex', route: '/pokedex' },
    { icon: '⚔️', label: 'Types & Strengths', route: '/types' },
    { icon: '🌍', label: 'Regions & Generations', route: '/regions' },
    { icon: '💥', label: 'Moves', route: '/moves' },
  ];

  menuItems = computed(() => {
    return this.authService.isAdmin() ? this.allMenuItems : this.allMenuItems.slice(0, 3);
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isOpen.set(false);
    scrollTo(0, 0);
  }
}
