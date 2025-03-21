import { Product, ProductFormData } from '../../types';

/**
 * Service interface for managing products
 */
export interface IProductService {
  /**
   * Retrieves all available products
   * @returns Promise resolving to an array of all products
   */
  getAllProducts(): Promise<Product[]>;

  /**
   * Retrieves a specific product by its ID
   * @param id - The unique identifier of the product
   * @returns Promise resolving to the product or undefined if not found
   */
  getProductById(id: number): Promise<Product | undefined>;

  /**
   * Retrieves all products belonging to a specific category
   * @param categoryId - The ID of the category
   * @returns Promise resolving to an array of products in the category
   */
  getProductsByCategory(categoryId: number): Promise<Product[]>;

  /**
   * Creates a new product
   * @param productData - The product data to create
   * @returns Promise resolving to the newly created product
   */
  createProduct(productData: ProductFormData): Promise<Product>;

  /**
   * Updates an existing product
   * @param id - The ID of the product to update
   * @param productData - The partial product data to update
   * @returns Promise resolving to the updated product or undefined if not found
   */
  updateProduct(id: number, productData: Partial<ProductFormData>): Promise<Product | undefined>;

  /**
   * Deletes a product by its ID
   * @param id - The ID of the product to delete
   * @returns Promise resolving to true if deletion was successful, false otherwise
   */
  deleteProduct(id: number): Promise<boolean>;

  /**
   * Retrieves the most recently modified product
   * @returns The last modified product or null if no products exist
   */
  getLastModifiedProduct(): Product | null;

  /**
   * Sets the last modified product
   * @param product - The product to set as last modified
   */
  setLastModifiedProduct(product: Product): void;

  /**
   * Clears the last modified product reference
   */
  clearLastModifiedProduct(): void;
}