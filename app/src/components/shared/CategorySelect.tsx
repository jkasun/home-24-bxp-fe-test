import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import type { Category } from '../../types';
import { categoryService } from '../../services/services/category.service';

interface CategorySelectProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  allowClear?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabledIds?: number[];
}

interface TreeNode {
  title: string;
  value: number;
  children?: TreeNode[];
  disabled?: boolean;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  placeholder = 'Select Category',
  allowClear = true,
  style,
  className,
  disabledIds = [],
}) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await categoryService.getAllCategories();
      setTreeData(buildTreeData(allCategories));
    };
    fetchCategories();
  }, []);

  const buildTreeData = (categories: Category[]): TreeNode[] => {
    // First, get all root categories (those without parent_id)
    const rootCategories = categories.filter(cat => !cat.parent_id);

    // Recursively build the tree structure
    const buildTree = (category: Category): TreeNode => {
      const children = categories.filter(cat => cat.parent_id === category.id);
      return {
        title: category.name,
        value: category.id,
        disabled: disabledIds.includes(category.id),
        children: children.length > 0 ? children.map(child => buildTree(child)) : undefined,
      };
    };

    return rootCategories.map(root => buildTree(root));
  };

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      style={{ width: '100%', ...style }}
      className={className}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeDefaultExpandAll
    />
  );
}; 