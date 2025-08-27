'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MessageCircle, X, Menu, Sparkles, TrendingUp, Heart, User } from 'lucide-react';
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
              className="md:hidden p-2 text-gray-300 hover:text-purple-400 hover:bg-white/10 rounded-lg transition-colors"
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
              Sign in
            </button>
          </div>

              {/* Feature highlights inspired by Memori */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">🧠</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Memory Intelligence</h3>
                  <p className="text-sm text-gray-300">Remembers preferences across sessions</p>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Smart Recommendations</h3>
                  <p className="text-sm text-gray-300">AI-powered product suggestions</p>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Personalized Experience</h3>
                  <p className="text-sm text-gray-300">Tailored to your unique style</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.value}
                    onClick={() => setSelectedCategory(action.value)}
                    className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-purple-500/50 rounded-full transition-all duration-200 text-white btn-premium"
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Hero Visual */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop"
                    alt="AI-powered shopping experience"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  {/* Overlay with stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass rounded-2xl p-4">
                      <div className="flex items-center gap-4 text-white">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gradient-primary">98%</div>
                          <div className="text-xs text-gray-300">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gradient-primary">2.3s</div>
                          <div className="text-xs text-gray-300">Response Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gradient-primary">∞</div>
                          <div className="text-xs text-gray-300">Memory Depth</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/30 blur-2xl rounded-full" />
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-400/30 blur-2xl rounded-full" />
              </div>
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
                      'w-full text-left px-4 py-3 rounded-xl transition-all duration-200',
                      selectedCategory === ''
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl transition-all duration-200 capitalize',
                        selectedCategory === category
                          ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                          : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="flex gap-8">
              {/* Products Grid */}
              <div className={cn(
                'transition-all duration-300',
                showChat ? 'flex-1' : 'w-full'
              )}>
                <ClientOnly
                  fallback={
                    <div className="space-y-6">
                      <div className="h-8 bg-white/10 rounded-lg w-48 animate-pulse" />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="glass-dark rounded-2xl overflow-hidden">
                            <div className="aspect-square bg-white/10 animate-pulse" />
                            <div className="p-4 space-y-3">
                              <div className="h-4 bg-white/10 rounded animate-pulse" />
                              <div className="h-6 bg-white/10 rounded animate-pulse w-3/4" />
                              <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <ProductGrid searchQuery={searchQuery} category={selectedCategory} />
                </ClientOnly>
              </div>

              {/* Chat Panel */}
              {showChat && (
                <div className="w-96 flex-shrink-0">
                  <div className="sticky top-24">
                    <ClientOnly
                      fallback={
                        <div className="h-[600px] glass-dark rounded-2xl shadow-2xl flex items-center justify-center">
                          <div className="text-gray-400 animate-pulse">Loading AI Memory...</div>
                        </div>
                      }
                    >
                      <Chatbot className="h-[600px]" />
                    </ClientOnly>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Chat FAB */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl btn-premium flex items-center justify-center z-50 pulse-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Chat Overlay */}
      {showChat && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setShowChat(false)}>
          <div className="absolute bottom-0 left-0 right-0 h-3/4 glass-dark rounded-t-2xl border-t border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-semibold text-white">AI Memory Assistant</h3>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ClientOnly>
              <Chatbot className="h-full border-none rounded-none shadow-none" />
            </ClientOnly>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center pulse-glow">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient-primary">
                  SmartShop
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Multi-Agent Memory Engine for shopping. SmartShop gives your AI agents human-like memory, 
                remembering preferences and delivering personalized experiences.
              </p>
              <div className="flex items-center gap-4">
                <div className="glass rounded-lg px-3 py-2">
                  <span className="text-sm text-purple-300">✨ Memory-Powered</span>
                </div>
                <div className="glass rounded-lg px-3 py-2">
                  <span className="text-sm text-blue-300">🧠 AI Intelligence</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <nav className="space-y-3">
                <a href="#products" className="block text-gray-300 hover:text-purple-400 transition-colors">Collections</a>
                <a href="#products" className="block text-gray-300 hover:text-purple-400 transition-colors">AI Recommendations</a>
                <a href="#products" className="block text-gray-300 hover:text-purple-400 transition-colors">Memory Insights</a>
                <button 
                  onClick={() => setShowChat(true)}
                  className="block text-gray-300 hover:text-purple-400 transition-colors text-left"
                >
                  Chat with AI
                </button>
              </nav>
            </div>

            {/* Technology */}
            <div>
              <h3 className="font-semibold text-white mb-4">Powered By</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">M</span>
                  </div>
                  <span className="text-gray-300">Memori Memory Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">DO</span>
                  </div>
                  <span className="text-gray-300">DigitalOcean AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-green-500 rounded flex items-center justify-center">
                    <span className="text-xs text-white font-bold">AI</span>
                  </div>
                  <span className="text-gray-300">Multi-Agent System</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SmartShop. Memory-powered shopping experience.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-400">Built by</span>
              <span className="text-sm text-gradient-primary font-semibold">GibsonAI</span>
            </div>
          </div>
        </div>
      </footer>

  {/* Desktop Floating Chat */}
  <FloatingChat />
    </div>
  );
}
