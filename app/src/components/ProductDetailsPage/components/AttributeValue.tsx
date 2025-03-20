import React from 'react';
import { Switch, Space, Tag } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { AttributeValue as AttributeValueType } from '../../../types';

export const AttributeValue: React.FC<{ attr: AttributeValueType }> = ({ attr }) => {
  switch (attr.type) {
    case 'number':
      return <span>{Number(attr.value).toLocaleString()}</span>;
    case 'boolean':
      return (
        <Switch
          checked={attr.value}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          disabled
        />
      );
    case 'url':
      return (
        <a href={attr.value} target="_blank" rel="noopener noreferrer">
          {attr.value}
        </a>
      );
    case 'tags':
      return (
        <Space wrap>
          {(Array.isArray(attr.value) ? attr.value : [attr.value]).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Space>
      );
    default:
      return <span>{attr.value}</span>;
  }
}; 