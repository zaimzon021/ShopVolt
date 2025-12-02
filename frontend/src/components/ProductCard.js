"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, viewMode = 'grid', onAddToCart, onToggleWishlist, isInWishlist = false }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(isInWishlist);

  const handleProductClick = () => {
    router.push(`/Shop/${product.id}`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // List view layout
  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all cursor-pointer" onClick={handleProductClick}>
        <CardContent className="p-0">
          <div className="flex gap-4">
            <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  -{product.discount}%
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${isLiked ? "text-red-500" : "text-muted-foreground"
                  }`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="p-4 flex-1">
              <div className="mb-2">
                {product.category && (
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                )}
                <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                {product.brand && (
                  <p className="text-sm text-gray-600">{product.brand}</p>
                )}
              </div>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                {product.rating && (
                  <span className="text-sm text-gray-600">
                    {product.rating} {product.reviews && `(${product.reviews})`}
                  </span>
                )}
              </div>

              {product.specs && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.specs.map((spec, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view layout (default)
  return (
    <Card className="group hover:shadow-lg transition-all cursor-pointer" onClick={handleProductClick}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              -{product.discount}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${isLiked ? "text-red-500" : "text-muted-foreground"
              }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            {product.category && (
              <Badge variant="outline" className="text-xs mb-2">
                {product.category}
              </Badge>
            )}
            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            {product.brand && (
              <p className="text-sm text-gray-600">{product.brand}</p>
            )}
          </div>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            {product.rating && (
              <span className="text-sm text-gray-600">
                {product.rating} {product.reviews && `(${product.reviews})`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
