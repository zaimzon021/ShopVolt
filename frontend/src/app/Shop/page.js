"use client";
import { useState, useEffect } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { productsAPI } from '@/lib/api';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const { toast } = useToast();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productsAPI.getAll();
        setAllProducts(products);
        setFilteredProducts(products);
        
        // Extract unique brands and categories
        const uniqueBrands = [...new Set(products.map(p => p.brand))];
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
        
        // Set max price range based on products
        const maxPrice = Math.max(...products.map(p => p.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({ 
          title: "Error loading products", 
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
      (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(filtered);
  }, [priceRange, selectedBrands, selectedCategories, searchQuery, sortBy]);

  const toggleWishlist = (id) => {
    const newWishlist = wishlist.includes(id) ? wishlist.filter(i => i !== id) : [...wishlist, id];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    toast({ title: wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist" });
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'} bg-card rounded-lg p-6 h-fit sticky top-20`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Price Range</label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mb-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Brands</label>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={brand} checked={selectedBrands.includes(brand)} onCheckedChange={(checked) => {
                      setSelectedBrands(checked ? [...selectedBrands, brand] : selectedBrands.filter(b => b !== brand));
                    }} />
                    <label htmlFor={brand} className="text-sm cursor-pointer">{brand}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Categories</label>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} checked={selectedCategories.includes(category)} onCheckedChange={(checked) => {
                      setSelectedCategories(checked ? [...selectedCategories, category] : selectedCategories.filter(c => c !== category));
                    }} />
                    <label htmlFor={category} className="text-sm cursor-pointer">{category}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />Filters
                </Button>
                <span className="text-muted-foreground">{filteredProducts.length} products</span>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-r-none">
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-l-none">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      onToggleWishlist={toggleWishlist}
                      isInWishlist={wishlist.includes(product.id)}
                      onAddToCart={(prod) => {
                        toast({ title: `${prod.name} added to cart!` });
                      }}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">No products found</p>
                    <Button onClick={clearFilters}>Clear filters</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
