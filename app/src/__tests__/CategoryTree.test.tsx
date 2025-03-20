import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { categoryService } from '../services/categoryService';
import { CategoryTree } from '../components/CategoriesPage/CategoryTree';

// Mock the categoryService
jest.mock('../services/categoryService', () => ({
  categoryService: {
    getAllCategories: jest.fn(),
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategory: jest.fn(),
  },
}));

describe('CategoryTree', () => {
  const mockCategories = [
    { id: 1, name: 'Root Category', parent_id: null },
    { id: 2, name: 'Child Category', parent_id: 1 },
    { id: 3, name: 'Second Root', parent_id: null },
    { id: 4, name: 'Child of Second Root', parent_id: 3 },
    { id: 5, name: 'Nested Child', parent_id: 2 },
    { id: 6, name: 'Another Root', parent_id: null },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (categoryService.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it('renders the category tree with initial categories', async () => {
    const { container } = render(<CategoryTree />);
    
    // Wait for loading to complete and root category to appear
    const rootCategory = await screen.findByText('Root Category');
    expect(rootCategory).toBeInTheDocument();
    
    // Click the expand button
    const expandButton = container.querySelector('.ant-tree-switcher');
    expect(expandButton).toBeInTheDocument();
    fireEvent.click(expandButton!);
    
    // Now check for the child category
    const childCategory = await screen.findByText('Child Category');
    expect(childCategory).toBeInTheDocument();
    
    expect(categoryService.getAllCategories).toHaveBeenCalledTimes(1);
  });

  it('opens add category modal when clicking Add Root Category button', async () => {
    render(<CategoryTree />);
    
    // Wait for loading to complete
    const addButton = await screen.findByText('Add Root Category');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    
    // Check if modal is visible
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('calls onSelectCategory when a category is selected', async () => {
    const mockOnSelectCategory = jest.fn();
    render(<CategoryTree onSelectCategory={mockOnSelectCategory} />);
    
    const rootCategory = await screen.findByText('Root Category');
    expect(rootCategory).toBeInTheDocument();

    fireEvent.click(rootCategory);
    
    expect(mockOnSelectCategory).toHaveBeenCalledWith(mockCategories[0]);
  });
}); 