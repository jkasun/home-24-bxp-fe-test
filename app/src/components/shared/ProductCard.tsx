import { Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  categoryPath?: string;
  onView: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ 
  product, 
  categoryPath, 
  onView, 
  onEdit, 
  onDelete 
}: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name} onClick={() => onView(product.id)}>{product.name}</h3>
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Category:</span>
          <span className={styles.value}>{categoryPath || '-'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>SKU:</span>
          <span className={styles.value}>{product.sku}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Price:</span>
          <span className={styles.value}>${product.price?.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Stock:</span>
          <span className={styles.value}>{product.stock}</span>
        </div>
      </div>
      <Space className={styles.actions}>
        <Button icon={<EyeOutlined />} onClick={() => onView(product.id)} />
        <Button icon={<EditOutlined />} onClick={() => onEdit(product)} />
        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(product.id)} />
      </Space>
    </div>
  );
}; 