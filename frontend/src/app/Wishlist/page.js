"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Sparkles,
  Eye
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';

const Wishlist = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart: addToCartContext } = useCart();
  const [isAnimating, setIsAnimating] = useState(null);

  const removeItem = (id) => {
    setIsAnimating(id);
    setTimeout(() => {
      removeFromWishlist(id);
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    }, 300);
  };

  const addToCart = async (item) => {
    const product = item.product || item;
    const success = await addToCartContext(product, 1);
    if (success) {
      toast({
        title: "Added to cart!",
        description: `${product.name} added to your cart.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addAllToCart = async () => {
    let successCount = 0;
    for (const item of wishlistItems) {
      const product = item.product || item;
      const success = await addToCartContext(product, 1);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast({
        title: "Added to cart!",
        description: `${successCount} items added to your cart.`,
      });
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="animate-bounce mb-8">
              <Heart className="w-24 h-24 mx-auto text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Save your favorite items and never lose track of what you love!
            </p>
            <Link href="/Shop">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Discover Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''} saved for later
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={addAllToCart}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => {
            const product = item.product || item;
            const productId = item.productId || item.id;
            const image = product.image || item.image || '/placeholder.svg';
            const name = product.name || item.name || 'Product';
            const category = product.category || item.category || 'General';
            const brand = product.brand || item.brand || '';
            const rating = parseFloat(product.rating || item.rating || 4.5);
            const reviews = parseInt(product.reviews || item.reviews || 0);
            const price = parseFloat(product.price || item.price || 0);
            const originalPrice = parseFloat(product.originalPrice || item.originalPrice || price);
            const discount = parseInt(product.discount || item.discount || 0);
            const inStock = product.inStock !== undefined ? product.inStock : (item.inStock !== undefined ? item.inStock : true);
            
            return (
            <Card 
              key={productId}
              className={`group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                isAnimating === productId ? 'opacity-0 scale-95' : ''
              }`}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  {image && image !== '' ? (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      -{discount}% OFF
                    </Badge>
                  )}

                  {/* Stock Badge */}
                  <Badge 
                    variant={inStock ? "default" : "destructive"}
                    className="absolute top-3 right-3"
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </Badge>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => router.push(`/Shop/${productId}`)}
                      className="bg-white hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item)}
                      disabled={!inStock}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 space-y-3">
                  {/* Category & Brand */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {category}
                    </Badge>
                    {brand && <span className="text-xs text-gray-500">{brand}</span>}
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">
                      ${price}
                    </span>
                    {originalPrice > price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={!inStock}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => removeItem(productId)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link href="/Shop">
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
