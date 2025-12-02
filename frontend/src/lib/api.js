// API base URL - use environment variable or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

  // Get trending products
  getTrending: async () => {
    const response = await fetch(`${API_BASE_URL}/products/trending`);
    if (!response.ok) throw new Error('Failed to fetch trending products');
    const data = await response.json();
    return data.map(product => ({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
    }));
  },

  // Get featured products
  getFeatured: async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured products');
    const data = await response.json();
    return data.map(product => ({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      originalPrice: typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice
    }));
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

// Admin API
export const adminAPI = {
  // Admin login
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Admin login failed');
    }
    
    return response.json();
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

// Orders API
export const ordersAPI = {
  create: async (userId, items, shippingAddress, paymentMethod, paymentId) => {
    try {
      console.log('Creating order with:', { userId, items, shippingAddress, paymentMethod, paymentId });
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, items, shippingAddress, paymentMethod, paymentId })
      });
      
      const data = await response.json();
      console.log('Order response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }
      
      return data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      console.log('Fetching all orders from:', `${API_BASE_URL}/orders/all`);
      const response = await fetch(`${API_BASE_URL}/orders/all`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to fetch all orders');
      }
      
      const data = await response.json();
      console.log('Orders received:', data.length, 'orders');
      return data;
    } catch (error) {
      console.error('Fetch all orders error:', error);
      throw error;
    }
  },

  getByUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getById: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  updateStatus: async (orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  }
};

// Payment API
export const paymentAPI = {
  process: async (userId, amount, paymentMethod, cardNumber, cardHolder) => {
    try {
      console.log('Processing payment:', { userId, amount, paymentMethod, cardNumber, cardHolder });
      const response = await fetch(`${API_BASE_URL}/payment/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount, paymentMethod, cardNumber, cardHolder })
      });
      
      const data = await response.json();
      console.log('Payment response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Payment processing failed');
      }
      
      return data;
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }
};

// Contact API
export const contactAPI = {
  create: async (name, email, subject, message, userId = null) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, userId })
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/contact`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update contact status');
    return response.json();
  }
};

// Wishlist API
export const wishlistAPI = {
  add: async (userId, productId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });
    if (!response.ok) throw new Error('Failed to add to wishlist');
    return response.json();
  },

  get: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch wishlist');
    return response.json();
  },

  remove: async (userId, productId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });
    if (!response.ok) throw new Error('Failed to remove from wishlist');
    return response.json();
  }
};

// Cart API
export const cartAPI = {
  add: async (userId, productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  get: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  updateQuantity: async (userId, productId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  remove: async (userId, productId) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
  },

  clear: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}/clear`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  }
};
