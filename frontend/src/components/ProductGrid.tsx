'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, apiService } from '@/lib/api';
import ProductCard from './ProductCard';

interface ProductGridProps {
  searchQuery?: string;
  category?: string;
}

export default function ProductGrid({ searchQuery = '', category = '' }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result: Product[];
      
      if (searchQuery || category) {
        result = await apiService.searchProducts({
          query: searchQuery || undefined,
          category: category || undefined,
        });
      } else {
        result = await apiService.getProducts();
      }
      
      setProducts(result);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
    // You could show a toast notification here
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-white/10 rounded-lg w-48 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse" />
            <div className="h-10 bg-white/10 rounded-lg w-24 animate-pulse" />
          </div>
        </div>
        
        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-dark rounded-2xl overflow-hidden">
              <div className="aspect-square bg-white/10 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/10 rounded animate-pulse" />
                <div className="h-6 bg-white/10 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-white/10 rounded animate-pulse w-20" />
                  <div className="h-10 bg-white/10 rounded-xl animate-pulse w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          </h2>
          <p className="text-gray-300 mt-1">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Sort Controls */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
            className="px-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="name-asc" className="bg-gray-800 text-white">Name (A-Z)</option>
            <option value="name-desc" className="bg-gray-800 text-white">Name (Z-A)</option>
            <option value="price-asc" className="bg-gray-800 text-white">Price (Low to High)</option>
            <option value="price-desc" className="bg-gray-800 text-white">Price (High to Low)</option>
            <option value="rating-desc" className="bg-gray-800 text-white">Rating (High to Low)</option>
            <option value="rating-asc" className="bg-gray-800 text-white">Rating (Low to High)</option>
          </select>
          
          {/* View Mode Toggle */}
          <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-300">
              {searchQuery || category
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'No products are available at the moment.'}
            </p>
          </div>
        </div>
      ) : (
        <div className={cn(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
