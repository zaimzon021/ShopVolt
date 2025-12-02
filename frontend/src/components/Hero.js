"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { productsAPI } from "@/lib/api";

const Hero = () => {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const products = await productsAPI.getTrending();
        // Take top 2 trending products
        const topProducts = products.slice(0, 2).map(p => ({
          id: p.id,
          name: p.name,
          price: `$${p.price}`,
          rating: p.rating,
          image: p.image,
          features: p.specs || [],
          customers: `${p.reviews}+`
        }));
        setFeaturedProducts(topProducts);
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
        // Fallback to default products
        setFeaturedProducts([
          {
            id: 1,
            name: "Premium Product",
            price: "$199",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            customers: "1k+"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featuredProducts]);

  if (loading || featuredProducts.length === 0) {
    return (
      <section className="relative min-h-[600px] md:min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  const product = featuredProducts[currentProduct];

  return (
    <section className="relative min-h-[600px] md:min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 md:py-12">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Premium Electronics & Home</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Revolutionary
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                Electronics
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Discover cutting-edge technology that transforms your digital life
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-gray-600 ml-2 text-sm">Trusted by 50,000+ customers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="group px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => router.push('/Shop')}
              >
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-6 py-5 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                onClick={() => router.push('/Categories')}
              >
                Explore Categories
              </Button>
            </div>
          </div>

          {/* Right Featured Product */}
          <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => router.push(`/Shop/${product.id}`)}
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
              
              <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-4 md:p-6 overflow-hidden aspect-square md:aspect-auto md:h-[400px]">
                <div className="absolute top-3 right-3 bg-blue-500/20 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full z-10">
                  <span className="text-blue-200 font-semibold text-xs md:text-sm">{product.customers}</span>
                  <span className="text-blue-300 text-xs ml-1 hidden sm:inline">Happy Customers</span>
                </div>

                <div className="relative h-[200px] sm:h-[250px] md:h-[280px] mt-4 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Hover Details */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center space-y-2 md:space-y-3 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white">{product.name}</h3>
                    <p className="text-xl md:text-2xl font-bold text-green-400">{product.price}</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      ))}
                      <span className="text-white ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg font-bold text-base md:text-lg">
                  {product.rating}★
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {featuredProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProduct(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentProduct ? 'bg-blue-400 w-6' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
