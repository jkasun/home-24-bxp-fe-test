import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Tree, Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { categoryService } from '../../services/services/category.service';
import { CategoryTreeNode } from './components/CategoryTreeNode';
import { CategoryForm } from './components/CategoryForm';
import type { TreeProps } from 'antd/es/tree';
import { Category } from '../../types';

interface CategoryTreeProps {
  onSelectCategory?: (category: Category) => void;
}

interface ExtendedTreeNode {
  key: number;
  title: string;
  children: ExtendedTreeNode[];
  category: Category;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const treeData = useMemo(() => {
    const categoryMap = new Map<number, ExtendedTreeNode>();
    const roots: ExtendedTreeNode[] = [];

    categories.forEach(category => {
      const node: ExtendedTreeNode = {
        key: category.id,
        title: category.name,
        children: [],
        category
      };
      categoryMap.set(category.id, node);

      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }, [categories]);

  const handleAddCategory = useCallback((parentId?: number) => {
    setEditingCategory(null);
    setSelectedParentId(parentId || null);
    setModalVisible(true);
  }, []);

  const handleEditCategory = useCallback((category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  }, []);

  const handleDeleteCategory = async (category: Category) => {
    try {
      await categoryService.deleteCategory(category.id);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, values);
      } else {
        await categoryService.createCategory({
          ...values,
          parent_id: selectedParentId
        });
      }
      setModalVisible(false);
      setSelectedParentId(null);
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  // Check if target is a descendant of source to prevent invalid drops
  const isDescendant = (sourceId: number, targetId: number): boolean => {
    const findDescendants = (categoryId: number): number[] => {
      const descendants: number[] = [];
      const category = categories.find(c => c.id === categoryId);
      if (!category) return descendants;

      const children = categories.filter(c => c.parent_id === category.id);
      children.forEach(child => {
        descendants.push(child.id);
        descendants.push(...findDescendants(child.id));
      });
      return descendants;
    };

    return findDescendants(sourceId).includes(targetId);
  };

  const onDrop: TreeProps['onDrop'] = async (info) => {
    const dropKey = info.node.key as number;
    const dragKey = info.dragNode.key as number;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    try {
      const dragCategory = categories.find(c => c.id === dragKey);
      if (!dragCategory) return;

      // Prevent dropping a parent into its descendant
      if (isDescendant(dragKey, dropKey)) {
        console.error('Cannot drop a parent category into its descendant');
        return;
      }

      // If dropping on the gap above or below a node
      if (dropPosition === -1 || dropPosition === 1) {
        const targetCategory = categories.find(c => c.id === dropKey);
        if (!targetCategory) return;

        // Update to have the same parent as the target, preserving the name
        await categoryService.updateCategory(dragKey, {
          parent_id: targetCategory.parent_id,
          name: dragCategory.name
        });
      } else {
        // Dropping directly onto a node - make it a child, preserving the name
        await categoryService.updateCategory(dragKey, {
          parent_id: dropKey,
          name: dragCategory.name
        });
      }

      // Refresh the tree
      await fetchCategories();
    } catch (error) {
      console.error('Failed to update category position:', error);
    }
  };

  return (
    <Card
      title="Category Tree"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleAddCategory()}
        >
          Add Root Category
        </Button>
      }
      loading={loading}
    >
      <Tree<ExtendedTreeNode>
        className="draggable-tree"
        draggable
        blockNode
        treeData={treeData}
        titleRender={(node) => (
          <CategoryTreeNode
            node={node}
            onAdd={handleAddCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        )}
        onDrop={onDrop}
        onSelect={(_selectedKeys, info) => {
          onSelectCategory?.(info.node.category);
        }}
      />

      <CategoryForm
        visible={modalVisible}
        editingCategory={editingCategory}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleFormSubmit}
      />
    </Card>
  );
}; 