# Backend - Smart Shopping AI Agent

FastAPI backend with dual AI agent options for intelligent shopping assistance powered by persistent memory.

## 🤖 AI Backend Options

Choose between two powerful AI implementations:

### Option A: DigitalOcean Gradient AI Platform
**Location**: `with-digital-ocean-agent/`
- Powered by [DigitalOcean's Gradient AI Platform](https://www.digitalocean.com/products/gradient/platform)
- Cloud-hosted AI with enterprise reliability
- Requires DigitalOcean Gradient AI credentials

### Option B: Swarms Multi-Agent System  
**Location**: `with-swarms-agent/`
- Advanced multi-agent intelligence with [Swarms framework](https://github.com/kyegomez/swarms)
- Specialized shopping assistant agents
- Requires OpenAI API key

## 🚀 Quick Start

### Option A: DigitalOcean Gradient AI

```bash
cd with-digital-ocean-agent

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your DigitalOcean Gradient AI credentials

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option B: Swarms Multi-Agent

```bash
cd with-swarms-agent

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your OpenAI API key

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **Memori** - Persistent memory system for customer interactions
- **SQLite** - Local database for memory storage
- **Pydantic** - Data validation and serialization
- **CORS** - Cross-origin resource sharing for frontend integration

## 📡 API Endpoints

- `POST /chat` - Send message to AI assistant
- `GET /products` - Get all products
- `POST /products/search` - Search products with filters
- `GET /products/{id}` - Get specific product
- `GET /categories` - Get product categories
- `GET /memory/search` - Search customer memory (admin)
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation

## 🗄️ Database & Memory

Each backend option uses its own SQLite database:
- **DigitalOcean**: `smart_shopping_digitalocean.db`
- **Swarms**: `smart_shopping_swarms.db`

Memory databases store:
- Customer conversation history
- Preferences and shopping patterns
- Product recommendations context
- Interaction metadata

## 🔧 Environment Variables

### DigitalOcean Gradient AI (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here  # For Memori
agent_endpoint=https://your-agent-endpoint.digitalocean.com
agent_access_key=your-digitalocean-access-key
```

### Swarms Multi-Agent (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🎯 Features

- **Memory-Enhanced Conversations**: Remembers customer preferences across sessions
- **Intelligent Product Recommendations**: AI-powered suggestions based on customer history
- **RESTful API**: Comprehensive endpoints for all shopping operations
- **Real-time Processing**: Fast response times for interactive chat
- **Scalable Architecture**: Ready for production deployment
- **Admin Tools**: Memory search and debugging capabilities

## 🔗 Frontend Integration

This backend is designed to work with the React/Vite frontend located in the `../frontend/` directory. The frontend expects the backend to run on `http://localhost:8000`.

## 📝 Development

- API documentation available at `http://localhost:8000/docs`
- Interactive testing with FastAPI's built-in Swagger UI
- Comprehensive logging for debugging and monitoring
- Hot reload during development with `--reload` flag
