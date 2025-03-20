import React from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Category } from '../../../types';
interface TreeNode {
  title: string;
  category: Category;
}

interface CategoryTreeNodeProps {
  node: TreeNode;
  onAdd: (parentId: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryTreeNode: React.FC<CategoryTreeNodeProps> = ({
  node,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    Modal.confirm({
      title: 'Delete Category',
      content: 'Are you sure you want to delete this category?',
      onOk: () => onDelete(node.category),
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>{node.title}</span>
      <div>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onAdd(node.category.id);
          }}
        />
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(node.category);
          }}
        />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}; 