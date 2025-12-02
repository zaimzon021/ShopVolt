"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  ShoppingCart, 
  RotateCcw, 
  MessageSquare, 
  BarChart3,
  Search
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Product form states
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    in_stock: true
  });

  useEffect(() => {
    // Mock data for demo
    setProducts([
      { id: '1', name: 'iPhone 15 Pro', description: 'Latest flagship', price: 999, category: 'Electronics', brand: 'Apple', in_stock: true, created_at: new Date().toISOString() },
      { id: '2', name: 'MacBook Pro', description: 'M3 Chip', price: 1999, category: 'Computers', brand: 'Apple', in_stock: true, created_at: new Date().toISOString() }
    ]);
    setOrders([
      { id: '1', customer_name: 'John Doe', customer_email: 'john@example.com', status: 'Delivered', total_amount: 999, created_at: new Date().toISOString() }
    ]);
    setReturns([]);
  }, []);

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) {
      alert("Please fill in required fields");
      return;
    }
    const newProduct = {
      id: Date.now().toString(),
      ...productForm,
      price: parseFloat(productForm.price),
      created_at: new Date().toISOString()
    };
    setProducts([newProduct, ...products]);
    setProductForm({ name: "", description: "", price: "", category: "", brand: "", in_stock: true });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productForm, price: parseFloat(productForm.price) } : p));
    setEditingProduct(null);
    setProductForm({ name: "", description: "", price: "", category: "", brand: "", in_stock: true });
  };

  const handleDeleteProduct = (id) => {
    if (!confirm("Are you sure?")) return;
    setProducts(products.filter(p => p.id !== id));
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      in_stock: product.in_stock
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Returns
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add/Edit Product Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Product Name *"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  />
                  <Textarea
                    placeholder="Description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Price *"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                  <Input
                    placeholder="Category"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  />
                  <Input
                    placeholder="Brand"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={productForm.in_stock}
                      onChange={(e) => setProductForm({ ...productForm, in_stock: e.target.checked })}
                    />
                    In Stock
                  </label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={editingProduct ? handleEditProduct : handleAddProduct}
                      className="flex-1"
                    >
                      {editingProduct ? "Update" : "Add"} Product
                    </Button>
                    {editingProduct && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({
                            name: "",
                            description: "",
                            price: "",
                            category: "",
                            brand: "",
                            in_stock: true
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Products List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Products ({filteredProducts.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category} • {product.brand}</p>
                            <p className="text-lg font-bold">${product.price}</p>
                            <Badge variant={product.in_stock ? "default" : "destructive"}>
                              {product.in_stock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditingProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders ({orders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{order.customer_name}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        <p className="text-lg font-bold">${order.total_amount}</p>
                      </div>
                      <div className="text-right">
                        <Badge>{order.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="returns">
            <Card>
              <CardHeader>
                <CardTitle>Returns ({returns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {returns.map((returnItem) => (
                    <div key={returnItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Return #{returnItem.id.slice(0, 8)}</h3>
                        <p className="text-sm text-muted-foreground">{returnItem.reason}</p>
                        <p className="text-lg font-bold">${returnItem.refund_amount}</p>
                      </div>
                      <div className="text-right">
                        <Badge>{returnItem.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(returnItem.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Support chat functionality will be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{products.length}</h3>
                      <p className="text-muted-foreground">Total Products</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{orders.length}</h3>
                      <p className="text-muted-foreground">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{returns.length}</h3>
                      <p className="text-muted-foreground">Total Returns</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;