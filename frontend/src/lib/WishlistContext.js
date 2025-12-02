"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from './api';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get userId from localStorage
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  };

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    const userId = getUserId();
    if (!userId) {
      // If no user, use localStorage
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
      return;
    }

    try {
      setLoading(true);
      const data = await wishlistAPI.get(userId);
      setWishlistItems(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      // Fallback to localStorage
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Save to localStorage whenever wishlist changes (for non-logged-in users)
  useEffect(() => {
    if (!getUserId()) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToWishlist = async (product) => {
    const userId = getUserId();

    if (userId) {
      // Add to backend
      try {
        await wishlistAPI.add(userId, product.id);
        await fetchWishlist(); // Refresh wishlist
        return true;
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
        return false;
      }
    } else {
      // Add to localStorage
      setWishlistItems((prev) => {
        const exists = prev.find((item) => item.id === product.id || item.productId === product.id);
        if (exists) {
          return prev;
        }
        return [...prev, product];
      });
      return true;
    }
  };

  const removeFromWishlist = async (productId) => {
    const userId = getUserId();

    if (userId) {
      // Remove from backend
      try {
        await wishlistAPI.remove(userId, productId);
        await fetchWishlist(); // Refresh wishlist
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    } else {
      // Remove from localStorage
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId && item.productId !== productId));
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId || item.productId === productId);
  };

  const clearWishlist = async () => {
    const userId = getUserId();

    if (userId) {
      // Clear from backend (you might need to add this endpoint)
      setWishlistItems([]);
    } else {
      // Clear from localStorage
      setWishlistItems([]);
    }
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
      return false;
    } else {
      await addToWishlist(product);
      return true;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        toggleWishlist,
        fetchWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
