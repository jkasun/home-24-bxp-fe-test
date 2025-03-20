import { Product, AttributeValue, ProductFormData } from '../types';

const LAST_MODIFIED_PRODUCT_KEY = 'lastModifiedProduct';

class ProductService {
  private static instance: ProductService;
  private readonly API_URL = 'http://localhost:8080';

  private constructor() { }

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  getLastModifiedProduct(): Product | null {
    const stored = localStorage.getItem(LAST_MODIFIED_PRODUCT_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  setLastModifiedProduct(product: Product): void {
    localStorage.setItem(LAST_MODIFIED_PRODUCT_KEY, JSON.stringify(product));
  }

  clearLastModifiedProduct(): void {
    localStorage.removeItem(LAST_MODIFIED_PRODUCT_KEY);
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.API_URL}/products`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const response = await fetch(`${this.API_URL}/products/${id}`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await fetch(`${this.API_URL}/products?category_id=${categoryId}`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch products by category');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products by category');
    }
  }

  async createProduct(productData: ProductFormData): Promise<Product> {
    try {
      const response = await fetch(`${this.API_URL}/products`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Failed to create product');
      const newProduct = await response.json();
      this.setLastModifiedProduct(newProduct);
      return newProduct;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create product');
    }
  }

  async updateProduct(id: number, productData: Partial<ProductFormData>): Promise<Product | undefined> {
    try {

      const response = await fetch(`${this.API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      this.setLastModifiedProduct(updatedProduct);
      return updatedProduct;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update product');
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok && response.status !== 404) {
        throw new Error('Failed to delete product');
      }

      const lastModified = this.getLastModifiedProduct();
      if (lastModified?.id === id) {
        this.clearLastModifiedProduct();
      }

      return response.ok;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete product');
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.API_URL}/products?q=${encodeURIComponent(query)}`, {
        headers: this.getAuthHeaders()
      });
      if (!response.ok) throw new Error('Failed to search products');
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to search products');
    }
  }
}

export const productService = ProductService.getInstance(); 