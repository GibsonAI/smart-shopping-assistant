import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Bot, 
  Sparkles, 
  ShoppingBag, 
  Star, 
  Zap,
  Heart,
  TrendingUp,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Bot,
    title: "Smart Recommendations",
    description: "Get personalized product recommendations based on your preferences and shopping history",
    color: "gradient-primary"
  },
  {
    icon: Sparkles,
    title: "Memory Enhancement",
    description: "Our AI remembers your conversations and learns from your preferences over time",
    color: "gradient-secondary"
  },
  {
    icon: ShoppingBag,
    title: "Smart Catalog",
    description: "Browse intelligently curated products with advanced filtering and search capabilities",
    color: "gradient-primary"
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Stay ahead with AI-driven insights on trending products and market analysis",
    color: "gradient-secondary"
  }
];

const stats = [
  { label: "Products", value: "10K+", icon: ShoppingBag },
  { label: "Happy Customers", value: "5K+", icon: Heart },
  { label: "AI Accuracy", value: "98%", icon: Zap },
  { label: "Avg Rating", value: "4.9", icon: Star }
];

interface IndexProps {
  onOpenChat: () => void;
}

const Index = ({ onOpenChat }: IndexProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 opacity-50" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 glass">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Memori
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Smart Shopping
              <br />
              <span className="text-foreground">Made Simple</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of online shopping with our AI Agent that remembers your preferences, 
              understands your needs, and helps you discover perfect products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gradient-primary hover-glow shadow-glow" onClick={onOpenChat}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Shopping with AI
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Link to="/products">
                <Button size="lg" variant="outline" className="glass hover-scale">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="glass shadow-card hover-scale">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SmartShop AI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology transforms how you discover and purchase products online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass shadow-card hover-scale hover-glow group">
                  <CardHeader className="text-center">
                    <div className={`p-3 rounded-full ${feature.color} w-fit mx-auto mb-4 group-hover:scale-110 transition-smooth`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container mx-auto px-4 relative">
          <Card className="glass shadow-card max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Smart Shopping Journey?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who've discovered the perfect products with our AI assistant
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary hover-glow shadow-glow" onClick={onOpenChat}>
                  <Bot className="h-5 w-5 mr-2" />
                  Chat with AI Now
                </Button>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="glass">
                    Explore Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a 
                href="https://github.com/GibsonAI/memori" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                GibsonAI Memori
              </a>
              {" "}- an open-source memory intelligence to empower memory-first AI agents.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
