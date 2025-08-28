import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  User,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: ShoppingBag },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-scale">
            <div className="p-2 rounded-lg gradient-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">SmartShop AI Agent</h1>
              <p className="text-xs text-muted-foreground">Intelligent Shopping</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-smooth ${
                      isActive(item.href) 
                        ? "gradient-primary shadow-glow" 
                        : "hover:glass"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" className="glass">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="glass">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden glass"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t glass">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={`w-full justify-start space-x-3 ${
                        isActive(item.href) 
                          ? "gradient-primary" 
                          : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
              
              <div className="flex space-x-2 pt-4 border-t border-border">
                <Button variant="outline" size="icon" className="glass flex-1">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="glass flex-1">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;