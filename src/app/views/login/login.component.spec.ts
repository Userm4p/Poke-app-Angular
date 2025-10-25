import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const authServiceSpy = {
      login: jest.fn(),
    };

    const routerSpy = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogin', () => {
    beforeEach(() => {
      component.username = '';
      component.password = '';
      component.submitted = false;
      component.loginError = false;
      component.validationMsg = signal({});
    });

    it('should set submitted to true', () => {
      component.onLogin();
      expect(component.submitted).toBe(true);
    });

    it('should show validation error for empty username', () => {
      component.username = '';
      component.password = 'password';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({ user: 'El usuario es requerido' });
    });

    it('should show validation error for empty password', () => {
      component.username = 'user';
      component.password = '';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({ pass: 'La contraseña es requerida' });
    });

    it('should show validation errors for both empty fields', () => {
      component.username = '';
      component.password = '';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({
        user: 'El usuario es requerido',
        pass: 'La contraseña es requerida',
      });
    });

    it('should show validation error for whitespace-only username', () => {
      component.username = '   ';
      component.password = 'password';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({ user: 'El usuario es requerido' });
    });

    it('should show validation error for whitespace-only password', () => {
      component.username = 'user';
      component.password = '   ';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({ pass: 'La contraseña es requerida' });
    });

    it('should not call auth.login when validation fails', () => {
      component.username = '';
      component.password = '';
      
      component.onLogin();
      
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('should call auth.login with correct credentials when validation passes', () => {
      component.username = 'user';
      component.password = 'password';
      authService.login.mockReturnValue(true);
      
      component.onLogin();
      
      expect(authService.login).toHaveBeenCalledWith('user', 'password');
    });

    it('should navigate to dashboard on successful login', () => {
      component.username = 'user';
      component.password = 'password';
      authService.login.mockReturnValue(true);
      
      component.onLogin();
      
      expect(component.loginError).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should show error message on failed login', () => {
      component.username = 'user';
      component.password = 'wrongpassword';
      authService.login.mockReturnValue(false);
      
      component.onLogin();
      
      expect(component.loginError).toBe(true);
      expect(component.validationMsg()).toEqual({
        auth: 'Usuario o contraseña incorrectos',
      });
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should clear previous validation messages', () => {
      component.username = 'user';
      component.password = 'password';
      component.validationMsg = signal({ user: 'Previous error' });
      authService.login.mockReturnValue(true);
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({});
    });

    it('should accumulate validation messages', () => {
      component.username = '';
      component.password = '';
      
      component.onLogin();
      
      expect(component.validationMsg()).toEqual({
        user: 'El usuario es requerido',
        pass: 'La contraseña es requerida',
      });
    });
  });

  describe('component initialization', () => {
    it('should initialize with default values', () => {
      expect(component.username).toBe('');
      expect(component.password).toBe('');
      expect(component.loginError).toBe(false);
      expect(component.submitted).toBe(false);
      expect(component.validationMsg()).toEqual({});
    });
  });
});
