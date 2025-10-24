import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ThemeToggleComponent, LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task_manager');
  protected readonly theme = signal(this.getStoredTheme());

  constructor(private router: Router, protected auth: AuthService) {
    this.applyTheme(this.theme());
  }

  handleThemeChange(next: 'light'|'dark') {
    this.theme.set(next);
    this.applyTheme(next);
    localStorage.setItem('theme', next);
  }

  handleLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private applyTheme(t: string) {
    document.body.setAttribute('data-theme', t);
  }

  private getStoredTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}
