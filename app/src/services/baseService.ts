import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import envConfig from '../config/env';
import { MockProductService } from './mock-services/mock-product.service';
import { MockCategoryService } from './mock-services/mock-category.service';
import { IProductService } from './core/product.service';
import { IAuthService } from './core/auth.service';
import { ICategoryService } from './core/category.service';
import { MockAuthService } from './mock-services/mock-auth.service';

// Service factory to switch between real and mock implementations
export class ServiceFactory {
  private static instance: ServiceFactory;
  private useMockServices: boolean;

  private constructor() {
    this.useMockServices = envConfig.useMockServices;
  }

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  setUseMockServices(useMock: boolean): void {
    this.useMockServices = useMock;
  }

  getAuthService(): IAuthService {
    return this.useMockServices ? new MockAuthService() : AuthService.getInstance();
  }

  getProductService(): IProductService {
    return this.useMockServices ? new MockProductService() : ProductService.getInstance();
  }

  getCategoryService(): ICategoryService {
    return this.useMockServices ? new MockCategoryService() : CategoryService.getInstance();
  }
}

// Export the factory instance
export const serviceFactory = ServiceFactory.getInstance(); 