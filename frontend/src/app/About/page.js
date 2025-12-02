"use client";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Users, Award, TrendingUp, Shield, Heart, Star, Package } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { icon: Users, label: 'Happy Customers', value: '50,000+' },
  { icon: Package, label: 'Products Sold', value: '100,000+' },
  { icon: Award, label: 'Awards Won', value: '25+' },
  { icon: Star, label: 'Average Rating', value: '4.8/5' }
];

const values = [
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every product is carefully selected and tested to meet our high standards.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go above and beyond for you.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation Driven',
    description: 'We bring you the latest technology and cutting-edge products.'
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Quick shipping and dependable service you can count on.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Technology',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Experience',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
  },
  {
    name: 'David Kim',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About ShopVolt
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're revolutionizing online shopping by bringing you the best electronics and home products
              with unmatched quality, service, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Founded in 2022, ShopVolt started with a simple mission: to make premium electronics
                    and home products accessible to everyone. What began as a small startup has grown into
                    a trusted destination for over 50,000 customers worldwide.
                  </p>
                  <p>
                    We believe that technology should enhance your life, not complicate it. That's why we
                    carefully curate every product in our catalog, ensuring it meets our strict standards
                    for quality, innovation, and value.
                  </p>
                  <p>
                    Today, we're proud to offer thousands of products from the world's leading brands,
                    backed by exceptional customer service and a commitment to your satisfaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg">The people behind ShopVolt</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers and discover amazing products today.
              </p>
              <Link href="/search">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Explore Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
