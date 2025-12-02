import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2
} from "lucide-react";

export const categories = [
  {
    id: 1,
    title: "Smartphones",
    description: "Latest smartphones with cutting-edge technology",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    icon: Smartphone,
    route: "/Shop?category=smartphones",
    productCount: 245,
    featured: true,
    subcategories: ["iPhone", "Android", "5G Phones"]
  },
  {
    id: 2,
    title: "Laptops",
    description: "High-performance laptops for work and gaming",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    icon: Laptop,
    route: "/Shop?category=laptops",
    productCount: 189,
    featured: true,
    subcategories: ["Gaming", "Business", "Ultrabooks"]
  },
  {
    id: 3,
    title: "Headphones",
    description: "Premium audio experience with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    icon: Headphones,
    route: "/Shop?category=headphones",
    productCount: 156,
    featured: true,
    subcategories: ["Wireless", "Gaming", "Studio"]
  },
  {
    id: 4,
    title: "Smartwatches",
    description: "Stay connected with smart wearable technology",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    icon: Watch,
    route: "/Shop?category=smartwatches",
    productCount: 134,
    featured: true,
    subcategories: ["Fitness", "Luxury", "Sport"]
  },
  {
    id: 5,
    title: "Cameras",
    description: "Capture moments with professional cameras",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    icon: Camera,
    route: "/Shop?category=cameras",
    productCount: 87,
    featured: true,
    subcategories: ["DSLR", "Mirrorless", "Action"]
  },
  {
    id: 6,
    title: "Gaming",
    description: "Level up with gaming consoles and accessories",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600",
    icon: Gamepad2,
    route: "/Shop?category=gaming",
    productCount: 167,
    featured: true,
    subcategories: ["Consoles", "Controllers", "VR"]
  }
];

export const getFeaturedCategories = () => {
  return categories.filter(cat => cat.featured);
};

export const getActiveCategories = () => {
  return categories;
};

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryByRoute = (route) => {
  return categories.find(cat => cat.route === route);
};
