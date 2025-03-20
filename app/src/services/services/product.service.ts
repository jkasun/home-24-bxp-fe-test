import { Product, ProductFormData } from '../../types';
import envConfig from '../../config/env';
import { IProductService } from '../core/product.service';

export class ProductService implements IProductService {
  private static instance: ProductService;
  private readonly API_URL = envConfig.apiBaseUrl;
  private lastModifiedProduct: Product | null = null;

  private constructor() { }

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
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

  async getAllProducts(): Promise<Product[]> {
    const response = await this.fetchWithAuth(`${this.API_URL}/products`);
    return response.json();
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const response = await this.fetchWithAuth(`${this.API_URL}/products/${id}`);
      return response.json();
    } catch (error) {
      return undefined;
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await this.fetchWithAuth(`${this.API_URL}/products?category_id=${categoryId}`);
    return response.json();
  }

  async createProduct(productData: ProductFormData): Promise<Product> {
    const response = await this.fetchWithAuth(`${this.API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    const product = await response.json();
    this.setLastModifiedProduct(product);
    return product;
  }

  async updateProduct(id: number, productData: Partial<ProductFormData>): Promise<Product | undefined> {
    try {
      const response = await this.fetchWithAuth(`${this.API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const product = await response.json();
      this.setLastModifiedProduct(product);
      return product;
    } catch (error) {
      return undefined;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      await this.fetchWithAuth(`${this.API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (this.lastModifiedProduct?.id === id) {
        this.clearLastModifiedProduct();
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  getLastModifiedProduct(): Product | null {
    return this.lastModifiedProduct;
  }

  setLastModifiedProduct(product: Product): void {
    this.lastModifiedProduct = product;
  }

  clearLastModifiedProduct(): void {
    this.lastModifiedProduct = null;
  }
}

export const productService = ProductService.getInstance(); 