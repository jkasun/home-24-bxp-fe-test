import envConfig from "../../config/env";
import { Category } from "../../types";
import { ICategoryService } from "../core/category.service";

export class MockCategoryService implements ICategoryService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Test Category 1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      parent_id: 1,
      name: 'Test Category 2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  async getAllCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.categories;
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.categories.find(c => c.id === id);
  }

  async getChildCategories(parentId: number): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.categories.filter(c => c.parent_id === parentId);
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const newCategory: Category = {
      id: this.categories.length + 1,
      ...category,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) return undefined;

    const updatedCategory: Category = {
      ...this.categories[index],
      ...category,
      updated_at: new Date().toISOString()
    };
    this.categories[index] = updatedCategory;
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const index = this.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.categories.splice(index, 1);
    return true;
  }

  async getCategoryPath(categoryId: number): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const path: Category[] = [];
    let currentId = categoryId;
    
    while (currentId) {
      const category = this.categories.find(c => c.id === currentId);
      if (category) {
        path.unshift(category);
        currentId = category.parent_id || 0;
      } else {
        break;
      }
    }
    
    return path;
  }
} 