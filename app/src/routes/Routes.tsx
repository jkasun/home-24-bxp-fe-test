import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Products } from '../components/ProductsPage/Products';
import { ProductDetails } from '../components/ProductDetailsPage/ProductDetails';
import { Categories } from '../components/CategoriesPage/Categories';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
    </RouterRoutes>
  );
}; 