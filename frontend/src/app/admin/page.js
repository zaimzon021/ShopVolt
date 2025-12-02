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
  Search
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { productsAPI, ordersAPI, contactAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Product form states
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    image: "",
    rating: "4.5",
    reviews: "0",
    discount: "0",
    inStock: true,
    isFeatured: false,
    isTrending: false,
    specs: ""
  });

  // Fetch data from backend
  useEffect(() => {
    fetchProducts();
    if (activeTab === 'orders') {
      fetchOrders();
    } else if (activeTab === 'contacts') {
      fetchContacts();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAllAdmin();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getAll();
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

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactAPI.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      toast({
        title: "Success",
        description: "Contact status updated"
      });
      fetchContacts();
    } catch (error) {
      console.error('Failed to update contact status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await ordersAPI.updateStatus(id, status);
      toast({
        title: "Success",
        description: "Order status updated"
      });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleAddProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        originalPrice: parseFloat(productForm.originalPrice || productForm.price),
        rating: parseFloat(productForm.rating),
        reviews: parseInt(productForm.reviews),
        discount: parseInt(productForm.discount),
        specs: productForm.specs ? productForm.specs.split(',').map(s => s.trim()) : []
      };

      await productsAPI.create(productData);
      toast({
        title: "Success",
        description: "Product added successfully"
      });
      
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Failed to add product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;

    try {
      setLoading(true);
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        originalPrice: parseFloat(productForm.originalPrice || productForm.price),
        rating: parseFloat(productForm.rating),
        reviews: parseInt(productForm.reviews),
        discount: parseInt(productForm.discount),
        specs: productForm.specs ? productForm.specs.split(',').map(s => s.trim()) : []
      };

      await productsAPI.update(editingProduct.id, productData);
      toast({
        title: "Success",
        description: "Product updated successfully"
      });
      
      fetchProducts();
      resetForm();
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setLoading(true);
      await productsAPI.delete(id);
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      brand: "",
      image: "",
      rating: "4.5",
      reviews: "0",
      discount: "0",
      inStock: true,
      isFeatured: false,
      isTrending: false,
      specs: ""
    });
  };

  const startEditingProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || product.price.toString(),
      category: product.category,
      brand: product.brand,
      image: product.image || "",
      rating: product.rating?.toString() || "4.5",
      reviews: product.reviews?.toString() || "0",
      discount: product.discount?.toString() || "0",
      inStock: product.inStock !== undefined ? product.inStock : true,
      isFeatured: product.isFeatured || false,
      isTrending: product.isTrending || false,
      specs: Array.isArray(product.specs) ? product.specs.join(', ') : ""
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacts
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
                <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
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
                    type="number"
                    placeholder="Original Price"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
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
                  <Input
                    placeholder="Image URL"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  />
                  <Input
                    placeholder="Specs (comma separated)"
                    value={productForm.specs}
                    onChange={(e) => setProductForm({ ...productForm, specs: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Rating"
                      value={productForm.rating}
                      onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Reviews"
                      value={productForm.reviews}
                      onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Discount %"
                    value={productForm.discount}
                    onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                  />
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      />
                      In Stock
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.isFeatured}
                        onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      />
                      Featured
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.isTrending}
                        onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                      />
                      Trending
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={editingProduct ? handleEditProduct : handleAddProduct}
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : (editingProduct ? "Update" : "Add") + " Product"}
                    </Button>
                    {editingProduct && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditingProduct(null);
                          resetForm();
                        }}
                        disabled={loading}
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
                            <div className="flex gap-2">
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                              {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                              {product.isTrending && <Badge variant="secondary">Trending</Badge>}
                            </div>
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
                  {orders.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No orders yet</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                            <Badge variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'pending' ? 'secondary' :
                              order.status === 'processing' ? 'outline' : 'destructive'
                            }>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {order.shippingAddress}
                          </p>
                          <p className="text-lg font-bold text-blue-600">${order.totalAmount}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="px-3 py-1 border rounded-md text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages ({contacts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No contact messages yet</p>
                  ) : (
                    contacts.map((contact) => (
                      <div key={contact.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{contact.name}</h3>
                              <Badge variant={
                                contact.status === 'resolved' ? 'default' :
                                contact.status === 'in-progress' ? 'secondary' : 'outline'
                              }>
                                {contact.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contact.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <select
                            value={contact.status}
                            onChange={(e) => handleUpdateContactStatus(contact.id, e.target.value)}
                            className="px-3 py-1 border rounded-md text-sm"
                          >
                            <option value="new">New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-1">Subject: {contact.subject}</p>
                          <p className="text-sm text-gray-700">{contact.message}</p>
                        </div>
                      </div>
                    ))
                  )}
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