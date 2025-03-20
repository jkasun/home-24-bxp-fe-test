export interface Category {
  id: number;
  parent_id?: number;
  name: string;
  // Additional helpful properties
  created_at?: string;
  updated_at?: string;
}

export interface AttributeValue {
  code: string;
  type: 'number' | 'text' | 'url' | 'tags' | 'boolean';
  value?: any;
  label: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  attributes: AttributeValue[];
  // Additional helpful properties
  description?: string;
  sku?: string;
  price?: number;
  stock?: number;
  created_at?: string;
  updated_at?: string;
}

// Additional types for form handling
export interface CategoryFormData extends Omit<Category, 'id'> {}
export interface ProductFormData extends Omit<Product, 'id'> {} 