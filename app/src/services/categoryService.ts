export interface Category {
  id: number;
  parent_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

class CategoryService {
  private static instance: CategoryService;
  private readonly API_URL = 'http://localhost:8080';

  private constructor() {}

  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.API_URL}/categories`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch categories');
    }
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const response = await fetch(`${this.API_URL}/categories/${id}`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to fetch category');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch category');
    }
  }

  async getChildCategories(parentId: number): Promise<Category[]> {
    try {
      const response = await fetch(`${this.API_URL}/categories?parent_id=${parentId}`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch child categories');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch child categories');
    }
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    try {
      const response = await fetch(`${this.API_URL}/categories`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(category)
      });
      if (!response.ok) throw new Error('Failed to create category');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create category');
    }
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined> {
    try {
      const response = await fetch(`${this.API_URL}/categories/${id}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(category)
      });
      if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to update category');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update category');
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });
      if (!response.ok && response.status !== 404) {
        throw new Error('Failed to delete category');
      }
      return response.ok;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete category');
    }
  }

  async getCategoryPath(categoryId: number): Promise<Category[]> {
    try {
      const path: Category[] = [];
      let currentId = categoryId;
      
      while (currentId) {
        const category = await this.getCategoryById(currentId);
        if (category) {
          path.unshift(category);
          currentId = category.parent_id || 0;
        } else {
          break;
        }
      }
      
      return path;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch category path');
    }
  }
}

export const categoryService = CategoryService.getInstance(); 