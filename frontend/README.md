# Smart Shopping Assistant Frontend

A beautiful, modern Next.js frontend for the Smart Shopping Assistant powered by DigitalOcean AI and Memori.

## ✨ Features

- **Beautiful Modern Design**: Glassmorphism effects, gradient backgrounds, and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **AI Chat Interface**: Interactive chatbot with memory-enhanced conversations
- **Product Catalog**: Dynamic product grid with search, filtering, and sorting
- **Real-time Updates**: Live product updates and instant search results
- **Advanced UI Components**: Custom cards, buttons, and interactive elements
- **Accessibility**: Screen reader friendly and keyboard navigation support

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Hover effects and transitions
- **Custom Icons**: Lucide React icons throughout
- **Typography**: Inter font for clean, modern text

### Interactive Components
- **Product Cards**: Hover effects, favorites, and quick actions
- **Chat Interface**: Real-time messaging with AI assistant
- **Search & Filters**: Dynamic product filtering and sorting
- **Navigation**: Sticky header with smooth scrolling
- **Mobile Menu**: Responsive navigation for mobile devices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layout for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch Friendly**: Large touch targets for mobile

## 🎯 Performance

- **Next.js 15**: Latest features and optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting and lazy loading
- **Bundle Size**: Optimized bundle size with tree shaking

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React & Heroicons
- **Animations**: CSS transitions and Framer Motion
- **TypeScript**: Full type safety
- **State Management**: React hooks and context

## 📦 Components

### Core Components
- `ProductCard` - Individual product display
- `ProductGrid` - Product catalog with filtering
- `Chatbot` - AI assistant interface
- `ClientOnly` - Hydration safety wrapper

### UI Elements
- Custom buttons with hover effects
- Animated loading states
- Responsive navigation
- Modal dialogs
- Toast notifications

## 🎨 Customization

### Colors
The design uses a comprehensive color system:
- **Primary**: Blue gradient (600-700)
- **Secondary**: Gray scale (50-900)
- **Accent**: Purple gradient for highlights
- **Status**: Success, warning, error colors

### Typography
- **Font**: Inter for all text
- **Sizes**: Responsive typography scale
- **Weights**: 400-700 font weights

### Spacing
- **Grid**: 8px base unit
- **Components**: Consistent padding and margins
- **Layout**: Responsive spacing scales

## 🔄 API Integration

The frontend connects to the FastAPI backend:

- **Products**: Fetch and search products
- **Categories**: Dynamic category filtering
- **Chat**: Real-time AI conversations
- **Memory**: Persistent user preferences

## 📱 Mobile Experience

- **Touch Gestures**: Swipe and tap interactions
- **Mobile Chat**: Full-screen chat overlay
- **Responsive Images**: Optimized for mobile
- **Fast Loading**: Optimized for mobile networks

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

## 🐛 Troubleshooting

### Common Issues
1. **Hydration Errors**: Use `ClientOnly` wrapper
2. **API Connection**: Check backend URL in `.env.local`
3. **Build Errors**: Ensure all dependencies are installed
4. **Styling Issues**: Check Tailwind configuration

### Performance Tips
1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Implement dynamic imports
3. **Caching**: Configure proper cache headers
4. **Bundle Analysis**: Use `@next/bundle-analyzer`

---

**Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies**
