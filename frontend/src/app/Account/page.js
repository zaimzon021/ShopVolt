"use client";
import { useState } from 'react';
import {
  User,
  Settings,
  ShoppingBag,
  CreditCard,
  MapPin,
  Heart,
  Camera,
  Phone,
  Mail,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  Star,
  Plus
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const userData = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  memberSince: "2022-03-15",
  totalOrders: 24,
  totalSpent: 3420.50,
  loyaltyPoints: 1250,
  membershipTier: "Gold"
};

const orders = [
  { id: '1', date: '2024-11-28', status: 'Delivered', total: 349.99, items: 2 },
  { id: '2', date: '2024-11-15', status: 'Shipped', total: 199.99, items: 1 },
  { id: '3', date: '2024-10-30', status: 'Processing', total: 599.99, items: 3 }
];

const wishlist = [
  { id: '1', name: 'AirPods Pro', price: 249, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=200' },
  { id: '2', name: 'iPad Air', price: 599, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 opacity-50"></div>

            <CardContent className="relative p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Picture */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full shadow-lg group-hover:scale-110 transition-transform"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                      {userData.membershipTier}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {new Date(userData.memberSince).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{userData.totalOrders}</div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold text-indigo-600">${userData.totalSpent}</div>
                    <div className="text-sm text-gray-600">Spent</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{userData.loyaltyPoints}</div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto p-1 bg-white/80">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 py-3">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 py-3">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2 py-3">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2 py-3">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700">{order.status}</Badge>
                        <p className="font-bold text-blue-600">${order.total}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Wishlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wishlist.map(item => (
                    <div key={item.id} className="flex gap-4 items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-blue-600 font-bold">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="mb-2">{order.status}</Badge>
                      <p className="font-bold text-blue-600">${order.total}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payment Methods
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                  <p className="text-sm opacity-80">Visa ending in</p>
                  <p className="text-2xl font-bold my-2">•••• 4242</p>
                  <div className="flex justify-between items-center">
                    <span>Expires 12/25</span>
                    <Badge className="bg-white/20">Default</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Saved Addresses
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold">Home</p>
                    <Badge>Default</Badge>
                  </div>
                  <p className="text-gray-600">123 Main Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                      <h3 className="font-bold mb-2">{item.name}</h3>
                      <p className="text-blue-600 font-bold text-xl mb-3">${item.price}</p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input defaultValue={userData.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input defaultValue={userData.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input defaultValue={userData.phone} />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
