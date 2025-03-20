import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Space, Button } from 'antd';
import type { Product, AttributeValue } from '../../../types';
import { Category } from '../../../services/categoryService';
import { CategorySelect } from '../../shared/CategorySelect';
import { PlusOutlined } from '@ant-design/icons';
import { AttributeEditor } from '../../shared/AttributeEditor';

interface EditProductProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editingProduct: Product | null;
  categories: Category[];
  products: Product[];
}

export const EditProduct: React.FC<EditProductProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  editingProduct,
  products,
}) => {
  const [form] = Form.useForm();
  const [attributes, setAttributes] = useState<AttributeValue[]>([]);

  React.useEffect(() => {
    if (editingProduct) {
      // Transform attributes array to object
      const attributesObj = editingProduct.attributes.reduce((acc, attr) => ({
        ...acc,
        [attr.code]: {
          value: attr.value,
          type: attr.type,
          label: attr.label
        }
      }), {});

      form.setFieldsValue({
        ...editingProduct,
        attributes: attributesObj
      });

      setAttributes(editingProduct.attributes.map(attr => ({
        code: attr.code,
        type: attr.type,
        label: attr.label,
        value: attr.value,
      })));
    } else {
      form.resetFields();
      setAttributes([]);
    }
  }, [editingProduct, form]);

  const handleAddAttribute = () => {
    const newAttribute: AttributeValue = {
      code: `attr_${attributes.length + 1}`,
      type: 'text',
      label: `Attribute ${attributes.length + 1}`,
      value: '',
    };
    setAttributes([...attributes, newAttribute]);
  };

  const handleAttributeChange = (index: number, updatedAttribute: AttributeValue) => {
    console.log(index, updatedAttribute);
    const newAttributes = [...attributes];
    newAttributes[index] = {
      ...updatedAttribute,
      value: attributes[index].value // Preserve the existing value
    } as AttributeValue;
    setAttributes(newAttributes);
  };

  const handleRemoveAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);

    // Remove the attribute from form values
    const formAttributes = form.getFieldValue('attributes') || {};
    delete formAttributes[attributes[index].code];
    form.setFieldsValue({ attributes: formAttributes });
  };

  const handleSubmit = (values: any) => {
    const { ...productData } = values;

    // Transform attributes back to array format with type information
    const finalAttributes = attributes
      .map((def: AttributeValue) => ({
        code: def.code,
        type: def.type,
        label: def.label,
        value: def.value
      }))
      .filter((attr: AttributeValue) => attr.value !== undefined && attr.value !== '');

    const productWithAttributes: Product = {
      ...productData,
      attributes: finalAttributes,
      id: editingProduct?.id || Math.max(...products.map(p => p.id), 0) + 1,
      created_at: editingProduct?.created_at || new Date().toISOString().split('T')[0],
    };

    // form.resetFields();
    console.log(productWithAttributes);
    onSubmit(productWithAttributes);
  };

  return (
    <Modal
      title={editingProduct ? 'Edit Product' : 'Add Product'}
      open={isOpen}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <CategorySelect />
        </Form.Item>

        <Space style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Please input SKU!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={0.01}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please input stock!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Space>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3>Product Attributes</h3>
            <Button type="dashed" onClick={handleAddAttribute} icon={<PlusOutlined />}>
              Add Attribute
            </Button>
          </div>
          <Space direction="vertical" style={{ width: '100%' }}>
            {attributes.map((attr, index) => (
              <Form.Item
                key={attr.code}
                shouldUpdate
                style={{ marginBottom: 16 }}
              >
                {() => (
                  <AttributeEditor
                    attribute={attr}
                    value={attr.value}
                    onAttributeChange={(updatedAttr) => handleAttributeChange(index, updatedAttr as AttributeValue)}
                    onValueChange={(value) => {
                      console.log(index, value);
                      setAttributes(attributes.map((attr, i) => i === index ? { ...attr, value } : attr));
                    }}
                    onDelete={() => handleRemoveAttribute(index)}
                  />
                )}
              </Form.Item>
            ))}
          </Space>
        </div>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Update' : 'Create'}
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}; 