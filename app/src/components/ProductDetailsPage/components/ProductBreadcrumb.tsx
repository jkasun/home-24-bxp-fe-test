import React from 'react';
import { Breadcrumb } from 'antd';
import { Category } from '../../../types';

interface ProductBreadcrumbProps {
  categoryPath: Category[];
  productName: string;
}

export const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ categoryPath, productName }) => (
  <Breadcrumb>
    <Breadcrumb.Item>Products</Breadcrumb.Item>
    {categoryPath.map((category) => (
      <Breadcrumb.Item key={category.id}>{category.name}</Breadcrumb.Item>
    ))}
    <Breadcrumb.Item>{productName}</Breadcrumb.Item>
  </Breadcrumb>
); 