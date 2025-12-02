"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Package, 
  Truck,
  Mail,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const orderNum = searchParams.get('orderNumber');
    if (orderNum) {
      setOrderNumber(orderNum);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Order Successful!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase
            </p>
            {orderNumber && (
              <p className="text-lg text-gray-700 font-semibold">
                Order Number: <span className="text-blue-600">{orderNumber}</span>
              </p>
            )}
          </div>

          {/* Order Details Card */}
          <Card className="bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="p-8">
              <div className="space-y-6">
               
                {/* Order Processing */}
                <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Package className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Order Processing
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your order is being processed and will be shipped soon.
                    </p>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Estimated Delivery
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your order will be delivered within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Account">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Package className="w-5 h-5 mr-2" />
                View My Orders
              </Button>
            </Link>
            
            <Link href="/Shop">
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need help with your order?
            </p>
            <Link href="/Contact">
              <Button variant="link" className="text-blue-600">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
