import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../Products.module.css';
import { CategorySelect } from '../../shared/CategorySelect';

interface ProductsHeaderProps {
  selectedCategory: number | null;
  pageSize: number;
  onAddProduct: () => void;
  onCategoryChange: (value: number | null) => void;
  onPageSizeChange: (value: number) => void;
}

export const ProductsHeader = ({
  selectedCategory,
  pageSize,
  onAddProduct,
  onCategoryChange,
  onPageSizeChange
}: ProductsHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.controls}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddProduct}
        >
          Add Product
        </Button>
        <CategorySelect
          value={selectedCategory || undefined}
          onChange={onCategoryChange}
          className={styles.categorySelect}
          placeholder="Filter by Category"
        />
      </div>
      <Select
        className={styles.pageSizeSelect}
        value={pageSize}
        onChange={onPageSizeChange}
      >
        <Select.Option value={5}>5 / page</Select.Option>
        <Select.Option value={10}>10 / page</Select.Option>
        <Select.Option value={20}>20 / page</Select.Option>
        <Select.Option value={50}>50 / page</Select.Option>
      </Select>
    </div>
  );
}; 