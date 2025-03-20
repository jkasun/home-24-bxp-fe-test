import { Product, ProductFormData } from '../../types';

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  createProduct(productData: ProductFormData): Promise<Product>;
  updateProduct(id: number, productData: Partial<ProductFormData>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  getLastModifiedProduct(): Product | null;
  setLastModifiedProduct(product: Product): void;
  clearLastModifiedProduct(): void;
}