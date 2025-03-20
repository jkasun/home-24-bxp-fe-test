export interface User {
  username: string;
  isAuthenticated: boolean;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): boolean;
}