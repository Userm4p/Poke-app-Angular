import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;
  submitted = false;
  validationMsg = signal<{ user?: string; pass?: string; auth?: string }>({});

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.submitted = true;
    this.validationMsg.set({});
    let valid = true;
    if (!this.username.trim()) {
      this.validationMsg.set({ ...this.validationMsg(), user: 'El usuario es requerido' });
      valid = false;
    }
    if (!this.password.trim()) {
      this.validationMsg.set({ ...this.validationMsg(), pass: 'La contraseña es requerida' });
      valid = false;
    }
    if (!valid) return;
    if (this.auth.login(this.username, this.password)) {
      this.loginError = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = true;
      this.validationMsg.set({ ...this.validationMsg(), auth: 'Usuario o contraseña incorrectos' });
    }
  }
}
