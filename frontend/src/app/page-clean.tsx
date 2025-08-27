'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MessageCircle, X, Menu, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiService } from '@/lib/api';
import ClientOnly from '@/components/ClientOnly';
import ProductGrid from '@/components/ProductGrid';
import Chatbot from '@/components/Chatbot';
import FloatingChat from '@/components/FloatingChat';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const quickActions = [
    { label: 'Electronics', value: 'electronics', icon: '📱' },
    { label: 'Clothing', value: 'clothing', icon: '👕' },
    { label: 'Home & Garden', value: 'home', icon: '🏠' },
    { label: 'Sports', value: 'sports', icon: '⚽' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center pulse-glow">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">
                  SmartShop
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">AI-Powered Shopping</p>
              </div>
            </div>

            {/* Top Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
              <a href="#products" className="hover:text-white transition-colors font-medium">Collections</a>
              <a href="#products" className="hover:text-white transition-colors font-medium">Account</a>
            </div>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 glass-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 text-sm"
                />
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <Heart className="w-5 h-5" />
              </button>
              
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 btn-aurora',
                  showChat ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' : ''
                )}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Chat</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 glass-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 text-sm"
                />
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-animation" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full mb-8 text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI-Powered Shopping Assistant</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shop smarter with our{' '}
            <span className="text-gradient-primary">AI shopping agent</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore collections, nail your size, and breeze through checkout — all in one elegant demo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 justify-center">
            <a
              href="#products"
              className="btn-aurora px-8 py-3 text-white font-medium"
            >
              Start exploring
            </a>
            <button className="px-8 py-3 text-gray-300 hover:text-white transition-colors font-medium">
              View cart
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="px-8 py-3 text-gray-300 hover:text-white transition-colors font-medium"
            >
              Sign in
            </button>
          </div>

          {/* Feature highlights - simplified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 glass-card rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Guided discovery</h3>
              <p className="text-sm text-gray-400">Fast, natural-language product search.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 glass-card rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Fit & size help</h3>
              <p className="text-sm text-gray-400">Confidence with size memory and tips.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 glass-card rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Personalization</h3>
              <p className="text-sm text-gray-400">Your brands, colors, and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Sidebar - Categories */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h2 className="font-semibold text-white">Categories</h2>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg transition-colors',
                      !selectedCategory 
                        ? 'bg-purple-600/20 text-purple-300' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg transition-colors capitalize',
                        selectedCategory === category
                          ? 'bg-purple-600/20 text-purple-300'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <ClientOnly>
              <ProductGrid 
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            </ClientOnly>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gradient-primary">SmartShop</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Experience the future of shopping with AI-powered memory and intelligent recommendations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-8 text-center">
            <p className="text-gray-400">© 2025 SmartShop. Demo experience.</p>
          </div>
        </div>
      </footer>

      {/* Chat Components */}
      <ClientOnly>
        {showChat && (
          <Chatbot onClose={() => setShowChat(false)} />
        )}
        <FloatingChat 
          onOpen={() => setShowChat(true)}
          isOpen={showChat}
        />
      </ClientOnly>
    </div>
  );
}
