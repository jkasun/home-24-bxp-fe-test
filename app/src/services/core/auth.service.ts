/**
 * Represents a user in the system with authentication details
 */
export interface User {
  /** The username of the user */
  username: string;
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** The authentication token for the user */
  token: string;
}

/**
 * Credentials required for user login
 */
export interface LoginCredentials {
  /** The username for login */
  username: string;
  /** The password for login */
  password: string;
}

/**
 * Service interface for handling authentication operations
 */
export interface IAuthService {
  /**
   * Authenticates a user with the provided credentials
   * @param credentials - The login credentials containing username and password
   * @returns Promise resolving to the authenticated user
   */
  login(credentials: LoginCredentials): Promise<User>;

  /**
   * Logs out the current user
   * @returns Promise that resolves when logout is complete
   */
  logout(): Promise<void>;

  /**
   * Retrieves the currently authenticated user
   * @returns Promise resolving to the current user or null if no user is authenticated
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Checks if there is currently an authenticated user
   * @returns boolean indicating whether a user is authenticated
   */
  isAuthenticated(): boolean;
}