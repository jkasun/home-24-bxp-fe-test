import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, Descriptions, Space, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types';
import { productService } from '../../services/services/product.service';
import { categoryService } from '../../services/services/category.service';
import { Category } from '../../types';
import styles from './ProductDetails.module.css';
import { ProductBreadcrumb } from './components/ProductBreadcrumb';
import { ProductAttributes } from './components/ProductAttributes';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryPath, setCategoryPath] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = useCallback(async () => {
    if (!id) return;

    try {
      const productData = await productService.getProductById(Number(id));
      if (productData) {
        setProduct(productData);
        if (productData.category_id) {
          const path = await categoryService.getCategoryPath(productData.category_id);
          setCategoryPath(path);
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleBackClick = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  const formattedCategoryPath = useMemo(() => {
    return categoryPath.map(cat => cat.name).join(' → ');
  }, [categoryPath]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBackClick}>
          Back to Products
        </Button>
        <div style={{ marginTop: 16 }}>Product not found</div>
      </div>
    );
  }

  return (
    <div>
      <Space direction="vertical" size="large" className={styles.container}>
        <div>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBackClick}
            className={styles.backButton}
          >
            Back to Products
          </Button>
          <ProductBreadcrumb categoryPath={categoryPath} productName={product.name} />
        </div>

        <Card title={product.name} variant="borderless">
          <Descriptions column={2}>
            <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
            <Descriptions.Item label="Price">${product.price?.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
            <Descriptions.Item label="Created At">{product.created_at}</Descriptions.Item>
            {product.description && (
              <Descriptions.Item label="Description" span={2}>
                {product.description}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Category" span={2}>
              {formattedCategoryPath}
            </Descriptions.Item>
            <Descriptions.Item label="Attributes" span={2}>
              <ProductAttributes attributes={product.attributes} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </div>
  );
}; 