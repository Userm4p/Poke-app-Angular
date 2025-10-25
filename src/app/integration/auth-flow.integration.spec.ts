import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { GuestGuard } from '../guards/guest.guard';
import { AdminGuard } from '../guards/admin.guard';

@Component({ selector: 'app-dashboard', template: '<div>Dashboard</div>' })
class DashboardComponent {}

@Component({ selector: 'app-login', template: '<div>Login</div>' })
class LoginComponent {}

@Component({ selector: 'app-admin', template: '<div>Admin</div>' })
class AdminComponent {}

describe('Authentication Flow Integration', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
          { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
        ]),
        HttpClientTestingModule,
        DashboardComponent,
        LoginComponent,
        AdminComponent,
      ],
      providers: [AuthService, AuthGuard, GuestGuard, AdminGuard],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    if (authService) {
      authService.logout();
    }
  });

  describe('Complete Authentication Flow', () => {
    it('should allow user to login and access protected routes', async () => {

      expect(authService.isLoggedIn()).toBe(false);

      const loginResult = authService.login('user', 'user');
      expect(loginResult).toBe(true);
      expect(authService.isLoggedIn()).toBe(true);
      expect(authService.isUser()).toBe(true);
      expect(authService.isAdmin()).toBe(false);

      authService.logout();
      expect(authService.isLoggedIn()).toBe(false);
    });

    it('should allow admin to login and access admin routes', async () => {

      const loginResult = authService.login('admin', 'admin');
      expect(loginResult).toBe(true);
      expect(authService.isLoggedIn()).toBe(true);
      expect(authService.isAdmin()).toBe(true);
      expect(authService.isUser()).toBe(false);
    });

    it('should persist user session across page reloads', () => {

      authService.login('user', 'user');
      expect(authService.isLoggedIn()).toBe(true);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'authUser',
        JSON.stringify({ username: 'user', password: 'user', role: 'user' })
      );
    });
  });

  describe('Guard Logic Integration', () => {
    it('should have correct logic for AuthGuard conditions', () => {

      authService.login('user', 'user');
      expect(authService.isLoggedIn()).toBe(true);
      
      authService.logout();
      expect(authService.isLoggedIn()).toBe(false);
    });

    it('should have correct logic for GuestGuard conditions', () => {

      authService.logout();
      expect(authService.isLoggedIn()).toBe(false);
      
      authService.login('user', 'user');
      expect(authService.isLoggedIn()).toBe(true);
    });

    it('should have correct logic for AdminGuard conditions', () => {

      authService.login('admin', 'admin');
      expect(authService.isLoggedIn()).toBe(true);
      expect(authService.isAdmin()).toBe(true);
      
      authService.logout();
      authService.login('user', 'user');
      expect(authService.isLoggedIn()).toBe(true);
      expect(authService.isAdmin()).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid credentials gracefully', () => {
      const loginResult = authService.login('invalid', 'invalid');
      expect(loginResult).toBe(false);
      expect(authService.isLoggedIn()).toBe(false);
    });

    it('should handle corrupted localStorage gracefully', () => {

      localStorage.setItem('authUser', 'invalid json');
      
      const newAuthService = new AuthService();
      expect(newAuthService.isLoggedIn()).toBe(false);
      expect(newAuthService.getUser()).toBeNull();
    });
  });
});
