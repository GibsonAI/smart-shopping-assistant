import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Grid, List, Star, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiService, type Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Types for local state
type ViewMode = 'grid' | 'list';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    category: undefined as string | undefined,
    max_price: undefined as number | undefined,
    min_rating: undefined as number | undefined,
    query: '' as string
  });
  const { toast } = useToast();

  // Fetch products
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiService.getProducts(),
  });

  // Fetch categories
  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
  });

  const categories = ['All', ...categoriesData];

  // Search products with filters when needed
  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ['searchProducts', searchFilters],
    queryFn: () => apiService.searchProducts({
      category: searchFilters.category,
      max_price: searchFilters.max_price,
      min_rating: searchFilters.min_rating,
      query: searchFilters.query || undefined
    }),
    enabled: Boolean(searchFilters.query || searchFilters.category || searchFilters.max_price || searchFilters.min_rating)
  });

  // Update search filters when inputs change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFilters({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        query: searchTerm,
        max_price: undefined,
        min_rating: undefined
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Use search results if searching, otherwise use all products
  const displayProducts = searchTerm || selectedCategory !== 'All' ? (searchResults || []) : products;

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast({
      title: favorites.includes(productId) ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const isLoading = productsLoading || categoriesLoading || searchLoading;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
              <p className="text-muted-foreground">Discover amazing products curated by AI</p>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 glass"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="glass"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="glass"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categoriesLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Loading categories...</span>
              </div>
            ) : (
              categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="glass"
                >
                  {category}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className={`grid ${viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
          } gap-6`}>
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="glass animate-pulse">
                <div className="aspect-video bg-muted" />
                <CardHeader>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-6 bg-muted rounded w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : productsError ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-destructive">Error loading products</h3>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
          } gap-6`}>
            {displayProducts.map((product) => (
              <Card key={product.id} className="glass shadow-card hover-scale hover-glow group overflow-hidden flex flex-col h-full">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 gradient-primary">
                    Featured
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) 
                          ? "fill-red-500 text-red-500" 
                          : ""
                      }`} 
                    />
                  </Button>
                </div>
                
                <CardHeader className="flex-grow">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${product.price}</span>
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  
                  <Button className="w-full gradient-primary hover-glow">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;