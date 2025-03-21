import { Category } from "../../types";

/**
 * Service interface for managing product categories
 */
export interface ICategoryService {
  /**
   * Retrieves all available categories
   * @returns Promise resolving to an array of all categories
   */
  getAllCategories(): Promise<Category[]>;

  /**
   * Retrieves a specific category by its ID
   * @param id - The unique identifier of the category
   * @returns Promise resolving to the category or undefined if not found
   */
  getCategoryById(id: number): Promise<Category | undefined>;

  /**
   * Retrieves all child categories of a parent category
   * @param parentId - The ID of the parent category
   * @returns Promise resolving to an array of child categories
   */
  getChildCategories(parentId: number): Promise<Category[]>;

  /**
   * Creates a new category
   * @param category - The category data without an ID
   * @returns Promise resolving to the newly created category
   */
  createCategory(category: Omit<Category, 'id'>): Promise<Category>;

  /**
   * Updates an existing category
   * @param id - The ID of the category to update
   * @param category - The partial category data to update
   * @returns Promise resolving to the updated category or undefined if not found
   */
  updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined>;

  /**
   * Deletes a category by its ID
   * @param id - The ID of the category to delete
   * @returns Promise resolving to true if deletion was successful, false otherwise
   */
  deleteCategory(id: number): Promise<boolean>;

  /**
   * Retrieves the complete path of categories from root to the specified category
   * @param categoryId - The ID of the target category
   * @returns Promise resolving to an array of categories representing the path
   */
  getCategoryPath(categoryId: number): Promise<Category[]>;
} 