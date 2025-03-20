import envConfig from '../../config/env';
import { User, IAuthService } from '../core/auth.service';
import { LoginCredentials } from '../core/auth.service';

export class AuthService implements IAuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private readonly API_URL = envConfig.apiBaseUrl;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.currentUser = {
        username: data.username,
        isAuthenticated: true,
        token: data.token,
      };
      localStorage.setItem('authToken', data.token);
      return this.currentUser;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch(`${this.API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } finally {
      this.currentUser = null;
      localStorage.removeItem('authToken');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${this.API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      const data = await response.json();
      this.currentUser = {
        username: data.username,
        isAuthenticated: true,
        token,
      };
      return this.currentUser;
    } catch (error) {
      this.currentUser = null;
      localStorage.removeItem('authToken');
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser?.isAuthenticated ?? false;
  }
}

export const authService = AuthService.getInstance(); 