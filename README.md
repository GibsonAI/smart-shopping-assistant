# Smart Shopping AI Agent with Memori

A complete smart shopping application powered by AI agents and [Memori](https://github.com/GibsonAI/memori) for persistent memory.

![# Smart Shopping Agent with Memori and DigitalOcean](./assets/Smart%20Shopping%20Made%20Lovable.gif)

## 🚀 Live Demo

**Try it now:** [https://smart-shopping-ai-agent.lovable.app/](https://smart-shopping-ai-agent.lovable.app/)

## 🌟 Features

- **Memory-Enhanced Shopping**: Remembers customer preferences and shopping history using Memori
- **Multiple AI Backend Options**: 
  - **DigitalOcean AI Integration**: Powered by DigitalOcean's AI platform for intelligent responses
  - **Swarms Multi-Agent System**: Enhanced intelligence with specialized shopping assistant agents
- **Modern Web Interface**: Beautiful React/Vite frontend with Tailwind CSS and shadcn/ui components
- **Real-time Chat**: Interactive chatbot with typing indicators and message history
- **Product Catalog**: Browse and search products with advanced filters
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Persistent Memory**: Customer interactions stored and recalled across sessions

## 🏗️ Architecture

### Option 1: DigitalOcean AI Backend
```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│   React/Vite        │    │    FastAPI          │    │   DigitalOcean AI   │
│   Frontend          │◄───┤    Backend          │◄───┤    Platform         │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │                     │
                           │   Memori Memory     │
                           │   System (SQLite)   │
                           │                     │
                           └─────────────────────┘
```

### Option 2: Swarms Multi-Agent Backend
```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│   React/Vite        │    │    FastAPI          │    │   Swarms Multi-     │
│   Frontend          │◄───┤    Backend          │◄───┤   Agent System      │
│                     │    │                     │    │   (OpenAI GPT-4)    │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                      │
                                      ▼
                           ┌─────────────────────┐
                           │                     │
                           │   Memori Memory     │
                           │   System (SQLite)   │
                           │                     │
                           └─────────────────────┘
```

## 📁 Project Structure

```
smart-shopping-assistant/
├── backend/
│   ├── with-digital-ocean-agent/
│   │   ├── main.py                 # FastAPI app with DigitalOcean AI
│   │   ├── requirements.txt        # Dependencies for DigitalOcean version
│   │   └── smart_shopping_digitalocean.db  # SQLite memory database
│   ├── with-swarms-agent/
│   │   ├── main.py                 # FastAPI app with Swarms multi-agents
│   │   ├── requirements.txt        # Dependencies for Swarms version
│   │   └── smart_shopping_swarms.db    # SQLite memory database
│   └── .env.example               # Environment configuration template
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx          # Main page component
│   │   ├── components/
│   │   │   ├── Chatbot.tsx       # Chat interface
│   │   │   ├── ChatWidget.tsx    # Floating chat widget
│   │   │   ├── Navigation.tsx    # App navigation
│   │   │   ├── ProductCard.tsx   # Product display card
│   │   │   ├── ProductGrid.tsx   # Product grid layout
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api.ts           # API service layer
│   │   │   └── utils.ts         # Utility functions
│   │   └── pages/
│   │       ├── Index.tsx        # Home page
│   │       ├── Products.tsx     # Product catalog page
│   │       └── NotFound.tsx     # 404 page
│   ├── package.json             # Node.js dependencies
│   ├── vite.config.ts          # Vite configuration
│   └── tailwind.config.ts      # Tailwind CSS config
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+ 
- Node.js 18+
- API credentials for your chosen backend:
  - **DigitalOcean**: DigitalOcean AI account with API credentials
  - **Swarms**: OpenAI API key

### 1. Backend Setup

Choose one of the two backend options:

#### Option A: DigitalOcean AI Backend

```bash
cd backend/with-digital-ocean-agent

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp ../env.example .env
# Edit .env with your DigitalOcean AI credentials:
# agent_endpoint=your-digitalocean-agent-endpoint
# agent_access_key=your-digitalocean-agent-access-key
# OPENAI_API_KEY=your-openai-api-key  # For Memori memory system

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Option B: Swarms Multi-Agent Backend

```bash
cd backend/with-swarms-agent

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp ../env.example .env
# Edit .env with your OpenAI API key:
# OPENAI_API_KEY=your-openai-api-key

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Configuration

### DigitalOcean AI Setup (Option A)

1. Create a DigitalOcean AI account
2. Get your agent endpoint and access key
3. Set the environment variables in `backend/with-digital-ocean-agent/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here  # For Memori memory system
agent_endpoint=https://your-agent-endpoint.digitalocean.com
agent_access_key=your-agent-access-key
```

### Swarms Multi-Agent Setup (Option B)

1. Create an OpenAI account and get your API key
2. Set the environment variables in `backend/with-swarms-agent/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Memory System

The Memori system automatically creates a SQLite database to store conversation history and customer preferences. Each backend option uses its own database:
- DigitalOcean: `smart_shopping_digitalocean.db`
- Swarms: `smart_shopping_swarms.db`

No additional setup required.

## 📡 API Endpoints

### Chat
- `POST /chat` - Send message to AI assistant

### Products
- `GET /products` - Get all products
- `POST /products/search` - Search products with filters
- `GET /products/{id}` - Get specific product
- `GET /categories` - Get product categories

### Memory
- `GET /memory/search` - Search customer memory (admin)

## 🎨 Frontend Features

### Modern React/Vite Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent design
- **React Query** for efficient data fetching and caching
- **React Router** for client-side navigation

### Chat Interface
- Real-time messaging with the AI assistant
- Floating chat widget accessible from any page
- Message history with timestamps and typing indicators
- Loading states and comprehensive error handling
- Responsive design optimized for all devices

### Product Catalog
- Modern grid layout with product cards
- Advanced search functionality with multiple filters
- Category-based filtering and sorting
- Product images, ratings, and detailed descriptions
- Responsive product cards with hover effects

### Memory Integration
- Customer preferences remembered across sessions
- Personalized product recommendations based on history
- Intelligent conversation context and follow-up responses

## 🔍 How It Works

### DigitalOcean AI Backend
1. **Customer Interaction**: User chats with the AI assistant about shopping needs
2. **Memory Search**: Memori searches previous interactions for customer context
3. **AI Processing**: DigitalOcean AI generates personalized responses using customer history
4. **Memory Storage**: Conversation automatically stored in Memori for future reference
5. **Product Recommendations**: AI suggests relevant products from catalog based on preferences

### Swarms Multi-Agent Backend
1. **Customer Interaction**: User engages with specialized shopping assistant agents
2. **Multi-Agent Coordination**: Swarms orchestrates multiple AI agents for enhanced intelligence
3. **Memory Integration**: Memori provides persistent memory across agent interactions
4. **Intelligent Processing**: Agents collaborate to understand customer needs and preferences
5. **Personalized Recommendations**: Advanced multi-agent system provides sophisticated product suggestions

## 🛠️ Development

### Adding New Features

1. **Backend**: Add new endpoints in `main.py`
2. **Frontend**: Create new components in `src/components/`
3. **API Integration**: Update `src/lib/api.ts`

### Customizing the Product Catalog

Edit the `PRODUCT_CATALOG` in `backend/main.py` to add your own products with:
- Product information
- Images
- Categories
- Descriptions

## 🐛 Troubleshooting

### Backend Issues
- **Service not initialized**: 
  - For DigitalOcean: Check credentials in `with-digital-ocean-agent/.env`
  - For Swarms: Check OpenAI API key in `with-swarms-agent/.env`
- **Memory errors**: Ensure SQLite database is writable in backend directory
- **CORS errors**: Verify frontend URL in CORS middleware configuration
- **Import errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`

### Frontend Issues
- **API connection failed**: Verify backend is running on port 8000
- **Build errors**: Check Vite/React and TypeScript configuration
- **Styling issues**: Ensure Tailwind CSS and shadcn/ui are properly configured
- **Component errors**: Verify all shadcn/ui components are properly installed

## 📝 License

This project is part of the Memori demonstration suite. Please refer to the main Memori license for usage terms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues related to:
- **Memori**: Check the main Memori documentation
- **DigitalOcean AI**: Consult DigitalOcean AI platform docs
- **Swarms**: Check the [Swarms documentation](https://github.com/kyegomez/swarms)
- **This Demo**: Create an issue in the repository

---

**Smart Shopping with AI Memory - Making every shopping experience personal! 🛍️🤖**

*Choose your AI backend: DigitalOcean for cloud-hosted AI or Swarms for advanced multi-agent intelligence!*
