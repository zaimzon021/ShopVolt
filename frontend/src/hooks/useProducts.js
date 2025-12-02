"use client";
import { useState, useEffect } from "react";
import { getFeaturedProducts, getTrendingProducts } from "@/data/products";

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const featured = getFeaturedProducts();
        setProducts(featured);
        setError(null);
      } catch (err) {
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    const featured = getFeaturedProducts();
    setProducts(featured);
    setLoading(false);
  };

  const clearError = () => setError(null);

  return { products, loading, error, refetch, clearError };
};

export const useTrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const trending = getTrendingProducts();
        setProducts(trending);
        setError(null);
      } catch (err) {
        setError("Failed to load trending products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    const trending = getTrendingProducts();
    setProducts(trending);
    setLoading(false);
  };

  const clearError = () => setError(null);

  return { products, loading, error, refetch, clearError };
};
