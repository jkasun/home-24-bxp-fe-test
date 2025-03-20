const products = [
  {
    id: 1,
    name: 'iPhone 15',
    category_id: 8, // iOS category
    sku: 'IPH15-128',
    price: 999,
    stock: 50,
    description: 'Latest iPhone model',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Black' },
      { code: 'storage', type: 'text', label: 'Storage', value: '128GB' },
      { code: 'weight', type: 'number', label: 'Weight', value: 171 },
      { code: 'features', type: 'tags', label: 'Features', value: ['5G', 'Face ID', 'MagSafe'] },
      { code: 'waterproof', type: 'boolean', label: 'Waterproof', value: true },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    category_id: 9, // Android category
    sku: 'SGS24-256',
    price: 899,
    stock: 35,
    description: 'Latest Samsung flagship phone',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Phantom Black' },
      { code: 'storage', type: 'text', label: 'Storage', value: '256GB' },
      { code: 'weight', type: 'number', label: 'Weight', value: 168 },
      { code: 'features', type: 'tags', label: 'Features', value: ['5G', 'Fingerprint', 'Wireless Charging'] },
      { code: 'waterproof', type: 'boolean', label: 'Waterproof', value: true },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 3,
    name: 'Men\'s Classic Fit Suit',
    category_id: 14, // Suits category
    sku: 'MCS-BLK-L',
    price: 299,
    stock: 20,
    description: 'Classic black suit for men',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Black' },
      { code: 'size', type: 'text', label: 'Size', value: 'L' },
      { code: 'material', type: 'text', label: 'Material', value: 'Wool Blend' },
      { code: 'care', type: 'tags', label: 'Care Instructions', value: ['Dry Clean Only', 'No Bleach'] },
      { code: 'custom_fit', type: 'boolean', label: 'Custom Fit Available', value: true },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 4,
    name: 'MacBook Pro 16"',
    category_id: 11, // Business Laptops category
    sku: 'MBP16-1TB',
    price: 2499,
    stock: 15,
    description: 'Apple MacBook Pro with M3 chip',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Space Gray' },
      { code: 'storage', type: 'text', label: 'Storage', value: '1TB' },
      { code: 'memory', type: 'text', label: 'Memory', value: '32GB' },
      { code: 'weight', type: 'number', label: 'Weight (g)', value: 2200 },
      { code: 'support_url', type: 'url', label: 'Support Page', value: 'https://support.apple.com/mac/macbook-pro' },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 5,
    name: 'Women\'s Running Shoes',
    category_id: 7, // Women category
    sku: 'WRS-WHT-38',
    price: 129.99,
    stock: 45,
    description: 'Professional running shoes for women',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'White/Pink' },
      { code: 'size', type: 'text', label: 'Size', value: '38' },
      { code: 'material', type: 'text', label: 'Material', value: 'Mesh' },
      { code: 'weight', type: 'number', label: 'Weight per Shoe (g)', value: 255 },
      { code: 'features', type: 'tags', label: 'Features', value: ['Breathable', 'Shock Absorption', 'Anti-Slip'] },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    category_id: 12, // Headphones category
    sku: 'SNY-WH5-BLK',
    price: 399,
    stock: 25,
    description: 'Wireless noise-canceling headphones',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Black' },
      { code: 'battery', type: 'text', label: 'Battery Life', value: '30 hours' },
      { code: 'weight', type: 'number', label: 'Weight (g)', value: 250 },
      { code: 'features', type: 'tags', label: 'Features', value: ['Noise Canceling', 'Bluetooth 5.0', 'Touch Controls'] },
      { code: 'foldable', type: 'boolean', label: 'Foldable Design', value: true },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 7,
    name: 'Leather Messenger Bag',
    category_id: 17, // Women's Accessories category
    sku: 'LMB-BRN-L',
    price: 199.99,
    stock: 30,
    description: 'Genuine leather messenger bag',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Brown' },
      { code: 'material', type: 'text', label: 'Material', value: 'Full Grain Leather' },
      { code: 'size', type: 'text', label: 'Size', value: 'Large' },
      { code: 'weight', type: 'number', label: 'Weight (g)', value: 980 },
      { code: 'care', type: 'tags', label: 'Care Instructions', value: ['Clean with Leather Cleaner', 'Avoid Water'] },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 8,
    name: 'Gaming Monitor 27"',
    category_id: 10, // Gaming Laptops category
    sku: 'GM27-165HZ',
    price: 349.99,
    stock: 20,
    description: '27-inch gaming monitor with 165Hz refresh rate',
    attributes: [
      { code: 'size', type: 'text', label: 'Screen Size', value: '27 inch' },
      { code: 'refresh_rate', type: 'number', label: 'Refresh Rate (Hz)', value: 165 },
      { code: 'resolution', type: 'text', label: 'Resolution', value: '2560x1440' },
      { code: 'features', type: 'tags', label: 'Features', value: ['G-Sync', 'HDR', 'VESA Mount'] },
      { code: 'manual_url', type: 'url', label: 'User Manual', value: 'https://support.example.com/gaming-monitor' },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 9,
    name: 'Wireless Gaming Mouse',
    category_id: 5, // Accessories category
    sku: 'WGM-RGB',
    price: 79.99,
    stock: 60,
    description: 'RGB wireless gaming mouse with 25K DPI',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Black' },
      { code: 'dpi', type: 'number', label: 'DPI', value: 25000 },
      { code: 'battery', type: 'text', label: 'Battery Life', value: '70 hours' },
      { code: 'features', type: 'tags', label: 'Features', value: ['RGB', 'Wireless', '8 Programmable Buttons'] },
      { code: 'rechargeable', type: 'boolean', label: 'Rechargeable', value: true },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 10,
    name: 'Smart Watch Series 5',
    category_id: 8, // iOS category
    sku: 'SWS5-44MM',
    price: 299.99,
    stock: 40,
    description: 'Advanced smartwatch with health monitoring',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Silver' },
      { code: 'size', type: 'text', label: 'Size', value: '44mm' },
      { code: 'battery', type: 'text', label: 'Battery Life', value: '18 hours' },
      { code: 'features', type: 'tags', label: 'Features', value: ['Heart Rate', 'GPS', 'Water Resistant'] },
      { code: 'support_url', type: 'url', label: 'Support', value: 'https://support.example.com/smartwatch' },
    ],
    created_at: '2024-03-18',
  },
  {
    id: 11,
    name: 'Mechanical Keyboard',
    category_id: 5, // Accessories category
    sku: 'MK-RGB-BR',
    price: 149.99,
    stock: 25,
    description: 'RGB mechanical keyboard with Brown switches',
    attributes: [
      { code: 'color', type: 'text', label: 'Color', value: 'Black' },
      { code: 'switch_type', type: 'text', label: 'Switch Type', value: 'Brown' },
      { code: 'layout', type: 'text', label: 'Layout', value: 'Full size' },
      { code: 'features', type: 'tags', label: 'Features', value: ['RGB Backlight', 'N-Key Rollover', 'USB Pass-through'] },
      { code: 'wireless', type: 'boolean', label: 'Wireless', value: false },
    ],
    created_at: '2024-03-18',
  }
]

module.exports = products;
