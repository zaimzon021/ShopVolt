"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { paymentAPI, ordersAPI } from '@/lib/api';
import { useCart } from '@/lib/CartContext';
import Image from 'next/image';

export default function Payment() {
  const router = useRouter();
  const { toast } = useToast();
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'Credit Card'
  });

  const [shippingAddress, setShippingAddress] = useState('');

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before checkout.",
        variant: "destructive"
      });
      router.push('/Cart');
    }
  }, [cartItems, router, toast]);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price || item.product?.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 199 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = parseInt(localStorage.getItem('userId') || 1);

      // Step 1: Process Payment
      const paymentResponse = await paymentAPI.process(
        userId,
        total,
        paymentForm.paymentMethod,
        paymentForm.cardNumber,
        paymentForm.cardHolder
      );

      // Step 2: Create Order
      const orderItems = cartItems.map(item => ({
        productId: item.productId || item.id,
        quantity: item.quantity,
        price: item.price || item.product?.price || 0
      }));

      const orderResponse = await ordersAPI.create(
        userId,
        orderItems,
        shippingAddress,
        paymentForm.paymentMethod,
        paymentResponse.paymentId
      );

      // Clear cart after successful order
      await clearCart();

      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully."
      });

      // Redirect to order success page
      setTimeout(() => {
        router.push(`/OrderSuccess?orderNumber=${orderResponse.orderNumber}`);
      }, 1500);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Processing...
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please wait while we redirect you to the order confirmation page.
            </p>
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Secure Checkout
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your purchase securely
          </p>
        </div>

        <form onSubmit={handlePayment}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter your shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Card Number"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                  />
                  <Input
                    placeholder="Cardholder Name"
                    value={paymentForm.cardHolder}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardHolder: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      value={paymentForm.expiryDate}
                      onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                      maxLength={5}
                    />
                    <Input
                      placeholder="CVV"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                      maxLength={3}
                      type="password"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                    <Lock className="w-4 h-4" />
                    <span>Secure payment processing</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="bg-white/80 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => {
                      const product = item.product || item;
                      const productId = item.productId || item.id;
                      const price = parseFloat(item.price || product.price || 0);
                      const image = item.image || product.image || '/placeholder.svg';
                      const name = item.name || product.name || 'Product';
                      
                      return (
                        <div key={productId} className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <Image 
                              src={image} 
                              alt={name} 
                              width={64} 
                              height={64}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-2">{name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            <p className="font-bold text-blue-600">${price.toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      "Processing..."
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Secure SSL Encrypted Payment
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
