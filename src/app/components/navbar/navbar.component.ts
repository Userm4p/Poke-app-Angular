import { Component, Output, EventEmitter, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isLoggedIn = false;
  @Output() logout = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();

  userInfo = computed(() => this.authService.getUser());

  constructor(private authService: AuthService) {}

  onLogout() {
    this.logout.emit();
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
