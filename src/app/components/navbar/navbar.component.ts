import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isLoggedIn = false;
  @Output() logout = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();
  
  onLogout() {
    this.logout.emit();
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
