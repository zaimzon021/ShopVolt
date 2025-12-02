// API base URL
const API_BASE_URL = 'http://localhost:3001';

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    console.log('Fetching products from:', `${API_BASE_URL}/products`);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      console.log('Products received:', data.length, 'items');
      
      // Convert price strings to numbers
      const normalizedData = data.map(product => ({
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
      }));
      
      return normalizedData;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    
    // Convert price strings to numbers
    return data.map(product => ({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
    }));
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const product = await response.json();
    
    // Convert price strings to numbers
    return {
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
    };
  },

  // Get categories with product counts
  getCategories: async () => {
    console.log('Fetching categories from:', `${API_BASE_URL}/products/categories`);
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      console.log('Categories received:', data);
      return data;
    } catch (error) {
      console.error('Fetch categories error:', error);
      throw error;
    }
  },

  // Create product (Admin)
  create: async (productData) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }
    return response.json();
  },

  // Update product (Admin)
  update: async (id, productData) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update product');
    }
    return response.json();
  },

  // Delete product (Admin)
  delete: async (id) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
    return response.json();
  },

  // Get all products (Admin) - if you have a separate admin endpoint
  getAllAdmin: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    
    // Convert price strings to numbers if needed
    return data.map(product => ({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
    }));
  }
};

// Auth API
export const authAPI = {
  // Signup
  signup: async (name, email, password) => {
    console.log('Signing up:', { name, email });
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      console.log('Signup response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Login
  login: async (email, password) => {
    console.log('Logging in:', email);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};
