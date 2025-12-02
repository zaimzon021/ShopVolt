"use client";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { useTrendingProducts } from "@/hooks/useProducts";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { useRef, useState, useEffect } from "react";

const TrendingProducts = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [dragThreshold] = useState(5);
  
  // Fetch trending products from API
  const { products: trendingProducts, loading, error, refetch, clearError } = useTrendingProducts();

  const handleViewTrending = () => {
    router.push('/search?sort=rating');
  };

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  // Smooth mouse drag functionality
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    
    setIsMouseDown(true);
    setStartX(e.pageX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setLastX(e.pageX);
    setLastTime(Date.now());
    setVelocity(0);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    
    const x = e.pageX;
    const distance = Math.abs(x - startX);
    
    if (!isDragging && distance > dragThreshold) {
      setIsDragging(true);
      scrollContainerRef.current.style.cursor = 'grabbing';
      scrollContainerRef.current.style.userSelect = 'none';
    }
    
    if (isDragging) {
      e.preventDefault();
      const walk = (x - startX);
      
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;
      if (timeDiff > 0) {
        const newVelocity = (e.pageX - lastX) / timeDiff;
        setVelocity(newVelocity);
      }
      
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      setLastX(e.pageX);
      setLastTime(currentTime);
    }
  };

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return;
    
    setIsMouseDown(false);
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.userSelect = 'auto';
    
    if (isDragging && Math.abs(velocity) > 0.1) {
      applyMomentum();
    }
  };

  const handleMouseLeave = () => {
    if (isMouseDown || isDragging) {
      handleMouseUp();
    }
  };

  const applyMomentum = () => {
    if (!scrollContainerRef.current) return;
    
    let currentVelocity = velocity * 100;
    const friction = 0.95;
    const minVelocity = 0.5;
    
    const animate = () => {
      if (!scrollContainerRef.current) return;
      
      if (Math.abs(currentVelocity) > minVelocity) {
        scrollContainerRef.current.scrollLeft -= currentVelocity;
        currentVelocity *= friction;
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  const handleContextMenu = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
      scrollContainerRef.current.style.scrollBehavior = 'auto';
    }
  }, []);

  // Don't render if loading and no data, or if there's no data and no error
  if (loading && trendingProducts.length === 0) {
    // Show loading state
  } else if (!loading && !error && trendingProducts.length === 0) {
    return null; // Hide section if no trending products
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="text-blue-600 font-semibold">Trending Now</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            What's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Trending
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular products loved by our customers
          </p>
        </div>

        {/* Content Area */}
        {loading ? (
          // Loading State
          <div className="relative">
            <div className="flex gap-6 overflow-hidden px-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-72">
                  <SkeletonLoader type="product-card" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unable to Load Trending Products</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">{error}</p>
            <Button 
              onClick={() => {
                clearError();
                refetch();
              }}
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        ) : trendingProducts.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No Trending Products</h3>
            <p className="text-muted-foreground">Check back later for trending products.</p>
          </div>
        ) : (
          // Success State - Horizontal Scroller
          <div className="relative">
            {/* Scroll Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-500/10 backdrop-blur-md border border-gray-300/20 hover:bg-gray-500/15 shadow-lg"
              onClick={scrollLeftBtn}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-500/10 backdrop-blur-md border border-gray-300/20 hover:bg-gray-500/15 shadow-lg"
              onClick={scrollRightBtn}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Scrollable Container with Drag Support */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12 select-none scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onContextMenu={handleContextMenu}
            >
              {trendingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-72 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard
                    product={product}
                    showQuickView={true}
                  />
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="text-center mt-6 text-sm text-gray-500">
              <p className="flex items-center justify-center gap-2">
                <span>←</span>
                <span>Drag or use arrows to see more products</span>
                <span>→</span>
              </p>
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-muted/30 via-muted/15 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-muted/30 via-muted/15 to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* View More - Only show if we have products */}
        {!loading && !error && trendingProducts.length > 0 && (
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              size="lg" 
              className="hover-glow group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={handleViewTrending}
            >
              View All Trending
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;