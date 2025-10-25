import { Injectable, computed, signal } from '@angular/core';
import { UserCred } from '../types/auth.types';

const USERS: UserCred[] = [
  { username: 'user', password: 'user', role: 'user' },
  { username: 'admin', password: 'admin', role: 'admin' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'authUser';
  private _user = signal<UserCred | null>(this.getSavedUser());

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  readonly isUser = computed(() => this._user()?.role === 'user');

  login(username: string, password: string): boolean {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (found) {
      this._user.set(found);
      localStorage.setItem(this.storageKey, JSON.stringify(found));
      return true;
    }
    return false;
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem(this.storageKey);
  }

  getUser(): UserCred | null {
    return this._user();
  }

  private getSavedUser(): UserCred | null {
    const val = localStorage.getItem(this.storageKey);
    try {
      if (val) return JSON.parse(val);
    } catch (e) {}
    return null;
  }
}
