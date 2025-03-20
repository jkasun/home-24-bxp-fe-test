import { Category } from "../../types";

export interface ICategoryService {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getChildCategories(parentId: number): Promise<Category[]>;
  createCategory(category: Omit<Category, 'id'>): Promise<Category>;
  updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  getCategoryPath(categoryId: number): Promise<Category[]>;
} 