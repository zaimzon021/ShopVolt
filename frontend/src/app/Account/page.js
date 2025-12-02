"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  Loader2
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ordersAPI } from '@/lib/api';
import { useWishlist } from '@/lib/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function Account() {
  const router = useRouter();
  const { toast } = useToast();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (!userId) {
      toast({
        title: "Please login",
        description: "You need to login to access your account.",
        variant: "destructive"
      });
      router.push('/login');
      return;
    }

    setUserData({
      id: userId,
      name: userName || 'User',
      email: userEmail || 'user@example.com'
    });

    fetchOrders(userId);
  }, [router, toast]);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const data = await ordersAPI.getByUser(userId);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    router.push('/');
  };

  const handleRemoveFromWishlist = async (productId) => {
    await removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist."
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 opacity-50"></div>

            <CardContent className="relative p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  {/* Profile Picture */}
                  <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* User Info */}
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                    <p className="text-gray-600">{userData.email}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white/80">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <User className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 py-3">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No orders yet</p>
                  ) : (
                    orders.slice(0, 3).map(order => (
                      <div key={order.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <div>
                          <p className="font-semibold">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="font-bold text-blue-600">${order.totalAmount}</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Wishlist Preview */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Wishlist ({wishlistItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wishlistItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No items in wishlist</p>
                  ) : (
                    wishlistItems.slice(0, 3).map(item => {
                      const product = item.product || item;
                      return (
                        <div key={item.id} className="flex gap-4 items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold line-clamp-1">{product.name}</p>
                            <p className="text-blue-600 font-bold">${product.price}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order History ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <Button onClick={() => router.push('/Shop')}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{order.shippingAddress}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="font-bold text-blue-600 mt-2">${order.totalAmount}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>My Wishlist ({wishlistItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-16">
                    <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">No items in wishlist</p>
                    <Button onClick={() => router.push('/Shop')}>
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map(item => {
                      const product = item.product || item;
                      const productId = item.productId || item.id;
                      return (
                        <div key={productId} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                          <p className="text-blue-600 font-bold text-xl mb-3">${product.price}</p>
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                              onClick={() => router.push(`/Shop/${productId}`)}
                            >
                              View Product
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleRemoveFromWishlist(productId)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
