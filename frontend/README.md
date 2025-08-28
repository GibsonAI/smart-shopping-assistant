# Frontend - Smart Shopping AI Agent

A modern React/Vite frontend for the Smart Shopping AI Agent with beautiful UI components and real-time chat functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and TypeScript
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── ChatWidget.tsx  # Floating chat interface
│   ├── Chatbot.tsx     # Chat component
│   ├── Navigation.tsx  # App navigation
│   └── Product*.tsx    # Product-related components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and API service
├── pages/              # Page components
└── App.tsx             # Main application component
```

## 🔧 Configuration

- **API URL**: Set `VITE_API_URL` environment variable (defaults to `http://localhost:8000`)
- **Port**: Development server runs on port 5173 by default

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Chat**: Interactive AI shopping assistant
- **Product Catalog**: Browse and search products with filters
- **Modern UI**: Clean design with dark/light mode support
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized with Vite for fast development and builds

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔗 Backend Integration

This frontend connects to the FastAPI backend running on port 8000. Make sure to start one of the backend options before running the frontend:

- **DigitalOcean Gradient AI Backend**: `backend/with-digital-ocean-agent/`
- **Swarms Multi-Agent Backend**: `backend/with-swarms-agent/`
