'use client';

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Plus } from 'lucide-react';
import { cn, formatPrice, formatRating } from '@/lib/utils';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite = false 
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onAddToCart?.(product);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-400'
        )}
      />
    ));
  };

  return (
    <div className="group relative glass-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover ring-1 ring-white/20 hover:ring-purple-400/50">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center`;
          }}
        />
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite?.(product.id)}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg border border-white/20',
            isFavorite
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-black/20 text-white hover:bg-black/40 hover:text-red-400'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-black/30 backdrop-blur-md text-white rounded-full capitalize border border-white/20">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
  <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-400 font-medium">
            {formatRating(product.rating)}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 btn-hover-lift',
              'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg border border-purple-500/50',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'
            )}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <Plus className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
