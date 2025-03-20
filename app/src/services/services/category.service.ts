import envConfig from '../../config/env';
import { ICategoryService } from '../core/category.service';
import { Category } from '../../types';

export class CategoryService implements ICategoryService {
  private static instance: CategoryService;
  private readonly API_URL = envConfig.apiBaseUrl;

  private constructor() { }

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return response;
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await this.fetchWithAuth(`${this.API_URL}/categories`);
    return response.json();
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const response = await this.fetchWithAuth(`${this.API_URL}/categories/${id}`);
      return response.json();
    } catch (error) {
      return undefined;
    }
  }

  async getChildCategories(parentId: number): Promise<Category[]> {
    const response = await this.fetchWithAuth(`${this.API_URL}/categories/${parentId}/children`);
    return response.json();
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const response = await this.fetchWithAuth(`${this.API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    return response.json();
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined> {
    try {
      const response = await this.fetchWithAuth(`${this.API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      return response.json();
    } catch (error) {
      return undefined;
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      await this.fetchWithAuth(`${this.API_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCategoryPath(categoryId: number): Promise<Category[]> {
    const response = await this.fetchWithAuth(`${this.API_URL}/categories/${categoryId}/path`);
    return response.json();
  }
}

export const categoryService = CategoryService.getInstance(); 