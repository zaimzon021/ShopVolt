"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from './api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get userId from localStorage
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    const userId = getUserId();
    if (!userId) {
      // If no user, use localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      return;
    }

    try {
      setLoading(true);
      const data = await cartAPI.get(userId);
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Save to localStorage whenever cart changes (for non-logged-in users)
  useEffect(() => {
    if (!getUserId()) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product, quantity = 1) => {
    const userId = getUserId();

    if (userId) {
      // Add to backend
      try {
        await cartAPI.add(userId, product.id, quantity);
        await fetchCart(); // Refresh cart
        return true;
      } catch (error) {
        console.error('Failed to add to cart:', error);
        return false;
      }
    } else {
      // Add to localStorage
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id || item.productId === product.id);
        if (existingItem) {
          return prev.map((item) =>
            (item.id === product.id || item.productId === product.id)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity, productId: product.id }];
      });
      return true;
    }
  };

  const removeFromCart = async (productId) => {
    const userId = getUserId();

    if (userId) {
      // Remove from backend
      try {
        await cartAPI.remove(userId, productId);
        await fetchCart(); // Refresh cart
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
    } else {
      // Remove from localStorage
      setCartItems((prev) => prev.filter((item) => item.id !== productId && item.productId !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const userId = getUserId();

    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    if (userId) {
      // Update in backend
      try {
        await cartAPI.updateQuantity(userId, productId, quantity);
        await fetchCart(); // Refresh cart
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    } else {
      // Update in localStorage
      setCartItems((prev) =>
        prev.map((item) =>
          (item.id === productId || item.productId === productId)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = async () => {
    const userId = getUserId();

    if (userId) {
      // Clear from backend
      try {
        await cartAPI.clear(userId);
        setCartItems([]);
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    } else {
      // Clear from localStorage
      setCartItems([]);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        cartCount: getCartCount(),
        cartTotal: getCartTotal(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
