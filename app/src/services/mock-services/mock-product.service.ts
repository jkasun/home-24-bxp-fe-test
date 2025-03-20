import { Product, ProductFormData } from "../../types";
import { IProductService } from "../core/product.service";
import envConfig from "../../config/env";

export class MockProductService implements IProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'Test Description 1',
      price: 100,
      category_id: 1,
      attributes: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Test Product 2',
      description: 'Test Description 2',
      price: 200,
      category_id: 2,
      attributes: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  private lastModifiedProduct: Product | null = null;

  async getAllProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.products.find(p => p.id === id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    return this.products.filter(p => p.category_id === categoryId);
  }

  async createProduct(productData: ProductFormData): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const newProduct: Product = {
      id: this.products.length + 1,
      ...productData,
      attributes: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.products.push(newProduct);
    this.setLastModifiedProduct(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, productData: Partial<ProductFormData>): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const updatedProduct: Product = {
      ...this.products[index],
      ...productData,
      updated_at: new Date().toISOString()
    };
    this.products[index] = updatedProduct;
    this.setLastModifiedProduct(updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, envConfig.mockApiDelay));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    if (this.lastModifiedProduct?.id === id) {
      this.clearLastModifiedProduct();
    }
    return true;
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