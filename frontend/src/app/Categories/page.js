"use client";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getActiveCategories } from '@/data/categories';

export default function Categories() {
  const router = useRouter();
  const categories = getActiveCategories();

  const handleCategoryClick = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              All Categories
            </h1>
            <p className="text-xl text-gray-600">
              Browse through our {categories.length} categories and discover thousands of amazing products
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm"
                  onClick={() => handleCategoryClick(category.route)}
                >
                  {/* Background Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Category Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Product Count */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      {category.productCount.toLocaleString()}+ Products
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      {category.description}
                    </p>

                    {/* Subcategories */}
                    {category.subcategories && (
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="text-xs px-2 py-1 bg-blue-50 rounded-full text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-all duration-300"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.route);
                      }}
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
