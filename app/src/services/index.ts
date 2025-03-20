import { ServiceFactory } from './baseService';
import { IAuthService } from './core/auth.service';
import { ICategoryService } from './core/category.service';
import { IProductService } from './core/product.service';

const serviceFactory = ServiceFactory.getInstance();

// Export the service instances using the factory
export const authService: IAuthService = serviceFactory.getAuthService();
export const productService: IProductService = serviceFactory.getProductService();
export const categoryService: ICategoryService = serviceFactory.getCategoryService();

// Export the factory for testing purposes
export { serviceFactory }; 