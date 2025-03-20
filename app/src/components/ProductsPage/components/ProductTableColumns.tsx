import { Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Product } from '../../../types';
import styles from '../Products.module.css';
import { Category } from '../../../types';

interface ProductTableColumnsProps {
  categoryPaths: Record<number, Category[]>;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onNavigate: (path: string) => void;
}

export const useProductTableColumns = ({
  categoryPaths,
  onEdit,
  onDelete,
  onNavigate
}: ProductTableColumnsProps) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (name: string, record: Product) => (
        <a className={styles.productLink} onClick={() => onNavigate(`/products/${record.id}`)}>{name}</a>
      ),
      className: styles.tableCell,
    },
    {
      title: 'Category',
      key: 'category',
      render: (record: Product) => {
        const path = categoryPaths[record.category_id];
        return (
          <span className={styles.categoryPath}>
            {path ? path.map(cat => cat.name).join(' → ') : '-'}
          </span>
        );
      },
      className: styles.tableCell,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      sorter: true,
      className: styles.tableCell,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price?.toFixed(2)}`,
      sorter: true,
      className: styles.tableCell,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: true,
      className: styles.tableCell,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Product) => (
        <Space className={styles.actionButtons}>
          <Button
            icon={<EyeOutlined />}
            onClick={() => onNavigate(`/products/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
      className: styles.tableCell,
    },
  ];
}; 