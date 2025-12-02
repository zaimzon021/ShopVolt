import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrendingProducts from "@/components/TrendingProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CategoryCards />
      <FeaturedProducts />
      <TrendingProducts />
      <Footer />
    </div>
  );
}
