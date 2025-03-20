import React from 'react';
import { Layout } from 'antd';
import { CategoryTree } from './CategoryTree';
import { Category } from '../../types';

const { Content } = Layout;

export const Categories: React.FC = () => {
  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category);
  };

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <CategoryTree onSelectCategory={handleCategorySelect} />
      </Content>
    </Layout>
  );
}; 