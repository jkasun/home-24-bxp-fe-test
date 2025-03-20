export interface User {
  username: string;
  isAuthenticated: boolean;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private readonly API_URL = 'http://localhost:8080';

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
        throw new Error('Invalid credentials');
      }

      const data: LoginResponse = await response.json();

      if (data.success) {
        const user: User = {
          username: credentials.username,
          isAuthenticated: true,
          token: data.token
        };
        this.currentUser = user;
        // Store token in localStorage for persistence
        localStorage.setItem('authToken', data.token);
        return user;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('authToken');
  }

  async getCurrentUser(): Promise<User | null> {
    // Check if we have a token in localStorage
    const token = localStorage.getItem('authToken');
    if (token && !this.currentUser) {
      // If we have a token but no current user, create a basic authenticated user
      this.currentUser = {
        username: 'Authenticated User', // We could make an API call to get actual user details
        isAuthenticated: true,
        token
      };
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser?.isAuthenticated ?? false;
  }
}

export const authService = AuthService.getInstance(); 