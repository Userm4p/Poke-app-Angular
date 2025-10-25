import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserCred } from '../types/auth.types';

describe('AuthService', () => {
  let service: AuthService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key];
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {};
        }),
      },
      writable: true,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    service.logout();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true for valid credentials', () => {
      const result = service.login('user', 'user');
      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getUser()?.username).toBe('user');
    });

    it('should return true for admin credentials', () => {
      const result = service.login('admin', 'admin');
      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getUser()?.username).toBe('admin');
      expect(service.isAdmin()).toBe(true);
    });

    it('should return false for invalid credentials', () => {
      const result = service.login('invalid', 'invalid');
      expect(result).toBe(false);
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should save user to localStorage on successful login', () => {
      service.login('user', 'user');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'authUser',
        JSON.stringify({ username: 'user', password: 'user', role: 'user' })
      );
    });
  });

  describe('logout', () => {
    it('should clear user and localStorage', () => {
      service.login('user', 'user');
      expect(service.isLoggedIn()).toBe(true);
      
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
      expect(service.getUser()).toBeNull();
      expect(localStorage.removeItem).toHaveBeenCalledWith('authUser');
    });
  });

  describe('computed properties', () => {
    it('should return correct isLoggedIn state', () => {
      expect(service.isLoggedIn()).toBe(false);
      
      service.login('user', 'user');
      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return correct isAdmin state', () => {
      service.login('user', 'user');
      expect(service.isAdmin()).toBe(false);
      
      service.logout();
      service.login('admin', 'admin');
      expect(service.isAdmin()).toBe(true);
    });

    it('should return correct isUser state', () => {
      service.login('admin', 'admin');
      expect(service.isUser()).toBe(false);
      
      service.logout();
      service.login('user', 'user');
      expect(service.isUser()).toBe(true);
    });
  });

  describe('getUser', () => {
    it('should return current user', () => {
      service.login('user', 'user');
      const user = service.getUser();
      expect(user).toEqual({ username: 'user', password: 'user', role: 'user' });
    });

    it('should return null when not logged in', () => {
      const user = service.getUser();
      expect(user).toBeNull();
    });
  });

  describe('persistence', () => {
    it('should restore user from localStorage on service creation', () => {
      const userData = { username: 'user', password: 'user', role: 'user' };
      mockLocalStorage['authUser'] = JSON.stringify(userData);
      
      const newService = new AuthService();
      expect(newService.isLoggedIn()).toBe(true);
      expect(newService.getUser()).toEqual(userData);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      mockLocalStorage['authUser'] = 'invalid json';
      
      const newService = new AuthService();
      expect(newService.isLoggedIn()).toBe(false);
      expect(newService.getUser()).toBeNull();
    });
  });
});
