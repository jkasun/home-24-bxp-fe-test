import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Category } from '../../../services/categoryService';

interface CategoryFormProps {
  visible: boolean;
  editingCategory: Category | null;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  visible,
  editingCategory,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (editingCategory) {
        form.setFieldsValue({
          name: editingCategory.name
        });
      }
    }
  }, [visible, editingCategory, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={`${editingCategory ? 'Edit' : 'Add'} Category`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}; 