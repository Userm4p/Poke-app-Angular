import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css'],
})
export class ThemeToggleComponent {
  @Input({ required: true }) theme!: () => 'light' | 'dark';
  @Output() themeChange = new EventEmitter<'light' | 'dark'>();

  setTheme(next: 'light' | 'dark') {
    if (next !== this.theme()) {
      this.themeChange.emit(next);
    }
  }
}
