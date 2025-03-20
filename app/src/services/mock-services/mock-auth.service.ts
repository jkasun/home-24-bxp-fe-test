import envConfig from "../../config/env";
import { LoginCredentials, User } from "../core/auth.service";
import { IAuthService } from "../core/auth.service";

export class MockAuthService implements IAuthService {
  private currentUser: User | null = null;

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));

    if (credentials.username === envConfig.mockTestUsername &&
      credentials.password === envConfig.mockTestPassword) {
      const user: User = {
        username: credentials.username,
        isAuthenticated: true,
        token: 'mock-token'
      };
      this.currentUser = user;
      localStorage.setItem('authToken', 'mock-token');
      return user;
    }
    throw new Error('Invalid credentials');
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    this.currentUser = null;
    localStorage.removeItem('authToken');
  }

  async getCurrentUser(): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser?.isAuthenticated ?? false;
  }
}