import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { EyeOutlined } from '@ant-design/icons';
import styles from './LastModifiedProduct.module.css';

interface LastModifiedProductProps {
  product: Product | null;
}

export const LastModifiedProduct: React.FC<LastModifiedProductProps> = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.label}>
            Last Modified Product
          </div>
          <div className={styles.productInfo}>
            <div>
              <div className={styles.productName}>
                {product.name}
              </div>
              <div className={styles.productDetails}>
                SKU: {product.sku} | Stock: {product.stock} | Price: ${product.price?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.viewButton}
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <EyeOutlined /> View Details
        </div>
      </div>
    </div>
  );
}; 