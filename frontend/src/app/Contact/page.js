"use client";
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Headphones,
  HelpCircle
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'support@shopvolt.com',
    detail: 'We respond within 24 hours'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: '+1 (555) 123-4567',
    detail: 'Mon-Fri, 9AM-6PM EST'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: '123 Tech Street, San Francisco, CA 94105',
    detail: 'By appointment only'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Monday - Friday: 9AM - 6PM',
    detail: 'Saturday: 10AM - 4PM'
  }
];

const faqs = [
  {
    question: 'What is your return policy?',
    answer: '30-day money-back guarantee on all products.'
  },
  {
    question: 'How long does shipping take?',
    answer: '3-5 business days for standard shipping, 1-2 days for express.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 50 countries worldwide.'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-xl">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-4">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{method.description}</p>
                  <p className="text-sm text-gray-600">{method.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue-600" />
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <Input
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          required
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        required
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        required
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ & Support */}
            <div className="space-y-6">
              {/* Quick Support */}
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Headphones className="w-8 h-8" />
                    <h3 className="text-xl font-bold">Need Quick Help?</h3>
                  </div>
                  <p className="mb-4 opacity-90">
                    Our support team is available 24/7 to assist you with any questions.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Quick Answers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="pb-4 border-b last:border-0">
                      <h4 className="font-semibold mb-2 text-gray-900">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">123 Tech Street, San Francisco, CA 94105</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
