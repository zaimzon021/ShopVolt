"use client";
import { useState, useEffect } from "react";
import { productsAPI } from "@/lib/api";

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products and filter featured ones
      const allProducts = await productsAPI.getAll();
      const featured = allProducts.filter(p => p.isFeatured);
      
      setProducts(featured);
    } catch (err) {
      console.error('Failed to load featured products:', err);
      setError("Failed to load featured products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  const clearError = () => setError(null);

  return { products, loading, error, refetch, clearError };
};

export const useTrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products and filter trending ones
      const allProducts = await productsAPI.getAll();
      const trending = allProducts.filter(p => p.isTrending);
      
      setProducts(trending);
    } catch (err) {
      console.error('Failed to load trending products:', err);
      setError("Failed to load trending products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => {
    fetchProducts();
  };

  const clearError = () => setError(null);

  return { products, loading, error, refetch, clearError };
};
