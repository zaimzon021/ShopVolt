"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Clock,
  Sparkles,
  Star,
  Gift,
  Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      price: 349.99,
      originalPrice: 399.99,
      image: '/placeholder.svg',
      category: 'Electronics',
      quantity: 1,
      inStock: true,
      rating: 4.8,
      features: ['30Hr Battery', 'AI Noise Canceling', 'Touch Controls']
    },
    {
      id: '2',
      name: 'Smart Coffee Maker Pro with WiFi',
      price: 199.99,
      image: '/placeholder.svg',
      category: 'Kitchen & Home',
      quantity: 2,
      inStock: true,
      rating: 4.6,
      features: ['WiFi Enabled', 'Programmable', '12-Cup Capacity']
    }
  ]);

  const [isAnimating, setIsAnimating] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 199 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setIsAnimating(id);
    setTimeout(() => setIsAnimating(null), 300);
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setIsAnimating(id);
    setTimeout(() => setCartItems(items => items.filter(item => item.id !== id)), 300);
  };

  const moveToWishlist = (id) => {
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setDiscount(subtotal * 0.2);
    } else if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(subtotal * 0.1);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="animate-bounce mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover amazing products and start shopping!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
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
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            {cartItems.length} item{cartItems.length > 1 ? 's' : ''} ready for checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                  isAnimating === item.id ? 'opacity-0 scale-95' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative group">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {item.originalPrice && (
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          SALE
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-lg line-clamp-2 text-gray-900">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            In Stock
                          </Badge>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price and Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg bg-white">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-l-lg hover:bg-blue-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-r-lg hover:bg-blue-50"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveToWishlist(item.id)}
                              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-blue-600" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  Try: <code className="bg-gray-100 px-1 rounded">SAVE20</code> or{' '}
                  <code className="bg-gray-100 px-1 rounded">WELCOME10</code>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" size="lg">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    Secure Checkout
                  </Button>
                  
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Shipping Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Estimated Delivery
                  </div>
                  <p className="text-sm text-gray-600">
                    3-5 business days for orders over $199
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Secure payment & free returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;