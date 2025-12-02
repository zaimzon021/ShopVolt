"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFeaturedCategories, getActiveCategories } from "@/data/categories";

const CategoryCards = () => {
  const router = useRouter();
  const featuredCategories = getFeaturedCategories();
  const allCategories = getActiveCategories();

  const handleCategoryClick = (route) => {
    router.push(route);
  };

  const handleViewAllCategories = () => {
    router.push('/search');
  };

  return (
    <section id="categories-section" className="py-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium products across {allCategories.length} categories with thousands of products
          </p>
        </div>

        {/* Featured Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl animate-scale-in bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/8"
                style={{ animationDelay: `${index * 0.2}s` }}
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
                <div className="p-6 space-y-4 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Subcategories */}
                  {category.subcategories && (
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-muted-foreground border border-white/10 group-hover:bg-white/20 group-hover:text-foreground transition-all duration-300"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-muted-foreground border border-white/10 group-hover:bg-white/20 group-hover:text-foreground transition-all duration-300">
                          +{category.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary-foreground hover:bg-primary/20 hover:backdrop-blur-md border border-transparent hover:border-primary/30 rounded-lg px-3 py-2 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.route);
                    }}
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>

              </Card>
            );
          })}
        </div>




      </div>
    </section>
  );
};

export default CategoryCards;