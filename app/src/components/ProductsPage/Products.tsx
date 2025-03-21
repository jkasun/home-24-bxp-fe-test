import { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, App } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Category, Product, ProductFormData } from '../../types';
import { categoryService } from '../../services/services/category.service';
import { productService } from '../../services/services/product.service';
import { EditProduct } from './components/EditProduct';
import { LastModifiedProduct } from '../shared/LastModifiedProduct';
import styles from './Products.module.css';
import { ProductsHeader } from './components/ProductsHeader';
import { ProductsMobileView } from './components/ProductsMobileView';
import { useProductTableColumns } from './components/ProductTableColumns';

export const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPaths, setCategoryPaths] = useState<Record<number, Category[]>>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [lastModifiedProduct, setLastModifiedProduct] = useState<Product | null>(() => {
    return productService.getLastModifiedProduct();
  });
  const { message: messageApi, modal } = App.useApp();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all products only once when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        messageApi.error('Failed to fetch products');
      }
    };
    
    fetchProducts();
  }, [messageApi]);

  // Memoize filtered products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => {
      const categoryPath = categoryPaths[product.category_id];
      if (!categoryPath) return false;
      return categoryPath.some(cat => cat.id === selectedCategory);
    });
  }, [products, selectedCategory, categoryPaths]);

  // Memoize getAllChildCategoryIds since it's a complex function that doesn't depend on any state
  const getAllChildCategoryIds = useCallback(async (categoryId: number): Promise<number[]> => {
    const result: number[] = [categoryId];
    const childCategories = await categoryService.getChildCategories(categoryId);

    for (const child of childCategories) {
      const childIds = await getAllChildCategoryIds(child.id);
      result.push(...childIds);
    }

    return result;
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoryService.getAllCategories();
      setCategories(categories);

      // Fetch category paths for all products
      const paths: Record<number, Category[]> = {};
      for (const product of products) {
        if (product.category_id) {
          paths[product.category_id] = await categoryService.getCategoryPath(product.category_id);
        }
      }
      setCategoryPaths(paths);
    };
    fetchCategories();
  }, [products]);

  // Memoize handlers that are passed as props
  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const success = await productService.deleteProduct(id);
        if (success) {
          setProducts(products.filter(product => product.id !== id));
          if (lastModifiedProduct?.id === id) {
            setLastModifiedProduct(null);
          }
          messageApi.success('Product deleted successfully');
        }
      },
    });
  }, [modal, products, lastModifiedProduct, messageApi]);

  const handleSubmit = useCallback(async (product: ProductFormData) => {
    if (editingProduct) {
      const updatedProduct = await productService.updateProduct(editingProduct.id, product);
      if (updatedProduct) {
        setProducts(products.map(product =>
          product.id === editingProduct.id ? updatedProduct : product
        ));
        setLastModifiedProduct(updatedProduct);
        messageApi.success('Product updated successfully');
      }
    } else {
      const newProduct = await productService.createProduct(product);
      setProducts([...products, newProduct]);
      setLastModifiedProduct(newProduct);
      messageApi.success('Product added successfully');
    }

    setIsEditModalOpen(false);
    setEditingProduct(null);
  }, [editingProduct, products, messageApi]);

  const handleTableChange = useCallback((_pagination: any, _filters: any, sorter: any) => {
    setProducts(prevProducts => {
      const sortedProducts = [...prevProducts].sort((a: any, b: any) => {
        if (!sorter.order) {
          return 0;
        }

        let compareA = a[sorter.field];
        let compareB = b[sorter.field];

        if (sorter.field === 'category') {
          compareA = categoryPaths[a.category_id]?.map(cat => cat.name).join(' → ') || '';
          compareB = categoryPaths[b.category_id]?.map(cat => cat.name).join(' → ') || '';
        }

        if (sorter.order === 'ascend') {
          return compareA > compareB ? 1 : -1;
        }
        return compareA < compareB ? 1 : -1;
      });
      return sortedProducts;
    });
  }, [categoryPaths]);

  // Memoize columns since they depend on multiple callbacks
  const columns = useMemo(() => useProductTableColumns({
    categoryPaths,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onNavigate: navigate
  }), [categoryPaths, handleEdit, handleDelete, navigate]);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, pageSize]);

  return (
    <div className={styles.container}>
      <LastModifiedProduct product={lastModifiedProduct} />

      <ProductsHeader
        selectedCategory={selectedCategory}
        pageSize={pageSize}
        onAddProduct={() => {
          setEditingProduct(null);
          setIsEditModalOpen(true);
        }}
        onCategoryChange={(value) => setSelectedCategory(value)}
        onPageSizeChange={(value) => setPageSize(value)}
      />

      <div className={styles.tableContainer}>
        {/* Desktop view */}
        <div className={styles.desktopView}>
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            pagination={{
              pageSize: pageSize,
              showSizeChanger: false,
              showTotal: (total) => `Total ${total} items`,
              responsive: true,
            }}
            onChange={handleTableChange}
            sortDirections={['ascend', 'descend']}
            scroll={{ x: 'max-content' }}
          />
        </div>

        {/* Mobile view */}
        <div className={styles.mobileView}>
          <ProductsMobileView
            products={filteredProducts}
            categoryPaths={categoryPaths}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            onView={(id) => navigate(`/products/${id}`)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <EditProduct
        isOpen={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        categories={categories}
        products={products}
      />
    </div>
  );
};
