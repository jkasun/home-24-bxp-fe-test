import React from 'react';
import { Space, Tag } from 'antd';
import { AttributeValue as AttributeValueType } from '../../../types';
import { AttributeValue } from './AttributeValue';
import styles from '../ProductDetails.module.css';

interface ProductAttributesProps {
  attributes: AttributeValueType[];
}

export const ProductAttributes: React.FC<ProductAttributesProps> = ({ attributes }) => (
  <Space direction="vertical" className={styles.attributeList}>
    {attributes.map((attr) => (
      <div key={attr.code} className={styles.attributeContainer}>
        <Tag color="blue" className={styles.attributeTag}>
          {attr.label || attr.code}
        </Tag>
        <AttributeValue attr={attr} />
      </div>
    ))}
  </Space>
); 