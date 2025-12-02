"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  
  const product = getProductById(params.id);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? `${product.name} removed from your wishlist.` : `${product.name} added to your wishlist.`,
    });
  };

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product not found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/Shop')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-blue-600">Home</button>
            <span>/</span>
            <button onClick={() => router.push('/Shop')} className="hover:text-blue-600">Shop</button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            {product.discount > 0 && (
              <Badge className="absolute z-10 top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg px-4 py-2">
                -{product.discount}% OFF
              </Badge>
            )}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            {product.brand && (
              <p className="text-blue-600 font-semibold mb-2">{product.brand}</p>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              {product.originalPrice > product.price && (
                <span className="text-gray-400 line-through text-2xl">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              <Badge variant={product.inStock ? "default" : "destructive"} className="text-sm">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-x border-gray-300 py-3"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={handleToggleWishlist}
                variant="outline"
                size="icon"
                className={`h-12 w-12 ${isLiked ? "text-red-500 border-red-500" : ""}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">SKU:</span> PROD-{product.id.toString().padStart(4, '0')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
