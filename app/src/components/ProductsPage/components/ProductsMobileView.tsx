import { Pagination } from 'antd';
import type { Category, Product } from '../../../types';
import styles from '../Products.module.css';
import { ProductCard } from '../../shared/ProductCard';
interface ProductsMobileViewProps {
  products: Product[];
  categoryPaths: Record<number, Category[]>;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onView: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductsMobileView = ({
  products,
  categoryPaths,
  currentPage,
  pageSize,
  onPageChange,
  onView,
  onEdit,
  onDelete
}: ProductsMobileViewProps) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className={styles.mobileCards}>
      {paginatedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          categoryPath={categoryPaths[product.category_id]?.map(cat => cat.name).join(' → ')}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      <div className={styles.mobilePagination}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={onPageChange}
          showTotal={(total) => `Total ${total} items`}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}; 