import envConfig from '../../config/env';
import { ICategoryService } from '../core/category.service';
import { Category } from '../../types';

export class CategoryService implements ICategoryService {
  private static instance: CategoryService;
  private readonly API_URL = envConfig.apiBaseUrl;
  private categoryTreeCache: Category[] | null = null;

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

  private async buildCategoryTree(): Promise<Category[]> {
    if (this.categoryTreeCache) {
      return this.categoryTreeCache;
    }

    const categories = await this.getAllCategories();
    this.categoryTreeCache = categories;
    return categories;
  }

  private findCategoryPath(categories: Category[], targetId: number): Category[] {
    const path: Category[] = [];
    let currentId = targetId;

    while (currentId) {
      const category = categories.find(cat => cat.id === currentId);
      if (!category) break;

      path.unshift(category);
      currentId = category.parent_id || 0;
    }

    return path;
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
    const newCategory = await response.json();
    
    // Update cache if it exists
    if (this.categoryTreeCache) {
      this.categoryTreeCache = [...this.categoryTreeCache, newCategory];
    }
    
    return newCategory;
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
      const updatedCategory = await response.json();
      
      // Update cache if it exists
      if (this.categoryTreeCache) {
        this.categoryTreeCache = this.categoryTreeCache.map(cat => 
          cat.id === id ? updatedCategory : cat
        );
      }
      
      return updatedCategory;
    } catch (error) {
      return undefined;
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      await this.fetchWithAuth(`${this.API_URL}/categories/${id}`, {
        method: 'DELETE',
      });
      
      // Update cache if it exists
      if (this.categoryTreeCache) {
        this.categoryTreeCache = this.categoryTreeCache.filter(cat => cat.id !== id);
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCategoryPath(categoryId: number): Promise<Category[]> {
    const categories = await this.buildCategoryTree();
    return this.findCategoryPath(categories, categoryId);
  }
}

export const categoryService = CategoryService.getInstance(); 