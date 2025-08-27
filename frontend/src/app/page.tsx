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

      {/* Hero Section - Compact */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl float-animation" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-dark rounded-full mb-6 text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI-Powered Shopping Assistant</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Shop smarter with our{' '}
            <span className="text-gradient-primary">AI shopping agent</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Explore collections, nail your size, and breeze through checkout — all in one elegant demo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 justify-center">
            <a
              href="#products"
              className="btn-aurora px-6 py-2.5 text-white font-medium text-sm"
            >
              Start exploring
            </a>
            <button className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors font-medium text-sm">
              View cart
            </button>
          </div>

          {/* Feature highlights - compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-10 glass-card rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">Guided discovery</h3>
              <p className="text-xs text-gray-400">Fast, natural-language product search.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 glass-card rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl">📏</span>
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">Fit & size help</h3>
              <p className="text-xs text-gray-400">Confidence with size memory and tips.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 glass-card rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="font-semibold text-white mb-1 text-sm">Personalization</h3>
              <p className="text-xs text-gray-400">Your brands, colors, and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Compact */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex gap-6">
          {/* Sidebar - Categories */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-20">
              <div className="glass-dark rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <h2 className="font-semibold text-white text-sm">Categories</h2>
                </div>
                
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg transition-colors text-sm',
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
                        'w-full text-left px-3 py-2 rounded-lg transition-colors capitalize text-sm',
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
                category={selectedCategory}
              />
            </ClientOnly>
          </div>
        </div>
      </main>

      {/* Footer - Compact */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gradient-primary">SmartShop</h3>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
                Experience the future of shopping with AI-powered assistance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors text-sm">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4 mt-6 text-center">
            <p className="text-gray-400 text-sm">© 2025 SmartShop. Demo experience.</p>
          </div>
        </div>
      </footer>

      {/* Chat Components */}
      <ClientOnly>
        <FloatingChat />
      </ClientOnly>
    </div>
  );
}
