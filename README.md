# Smart Shopping Agent with Memori

A complete smart shopping assistant application powered by [DigitalOcean AI agents](https://www.digitalocean.com/products/gradient/platform) and [Memori](https://github.com/GibsonAI/memori) for persistent memory. 

## 🌟 Features

- **Memory-Enhanced Shopping**: Remembers customer preferences and shopping history using Memori
- **DigitalOcean AI Integration**: Powered by DigitalOcean's AI platform for intelligent responses
- **Modern Web Interface**: Beautiful Next.js frontend with Tailwind CSS
- **Real-time Chat**: Interactive chatbot for shopping assistance
- **Product Catalog**: Browse and search products with filters
- **RESTful API**: FastAPI backend with comprehensive endpoints
- **Persistent Memory**: Customer interactions stored and recalled across sessions

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│    Next.js          │    │    FastAPI          │    │   DigitalOcean AI   │
│    Frontend         │◄───┤    Backend          │◄───┤    Platform         │
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

## 📁 Project Structure

```
smart_shopping_digitalocean/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── .env.example           # Environment configuration template
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx       # Main page component
│   │   ├── components/
│   │   │   ├── Chatbot.tsx    # Chat interface
│   │   │   ├── ChatInput.tsx  # Chat input component
│   │   │   ├── ChatMessage.tsx # Message display
│   │   │   ├── ProductCard.tsx # Product display card
│   │   │   └── ProductGrid.tsx # Product grid layout
│   │   └── lib/
│   │       └── api.ts         # API service
│   ├── package.json           # Node.js dependencies
│   └── .env.local            # Frontend environment
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+ 
- Node.js 18+
- DigitalOcean AI account with API credentials

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your DigitalOcean AI credentials:
# agent_endpoint=your-digitalocean-agent-endpoint
# agent_access_key=your-digitalocean-agent-access-key

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

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🔧 Configuration

### DigitalOcean AI Setup

1. Create a DigitalOcean AI account
2. Get your agent endpoint and access key
3. Set the environment variables in `backend/.env`:

```env
agent_endpoint=https://your-agent-endpoint.digitalocean.com
agent_access_key=your-agent-access-key
```

### Memory System

The Memori system automatically creates a SQLite database to store conversation history and customer preferences. No additional setup required.

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

### Chat Interface
- Real-time messaging with the AI assistant
- Message history with timestamps
- Loading indicators and error handling
- Responsive design for all devices

### Product Catalog
- Grid layout with product cards
- Search functionality
- Category filtering
- Product images and ratings
- Add to cart functionality

### Memory Integration
- Customer preferences remembered across sessions
- Personalized product recommendations
- Shopping history recall

## 🔍 How It Works

1. **Customer Interaction**: User chats with the AI assistant about shopping needs
2. **Memory Search**: System searches previous interactions for context
3. **AI Processing**: DigitalOcean AI generates personalized responses
4. **Memory Storage**: Conversation stored in Memori for future reference
5. **Product Recommendations**: AI suggests relevant products from catalog

## 🆚 Comparison with Azure Version

| Feature | DigitalOcean Version | Azure AI Foundry Version |
|---------|---------------------|--------------------------|
| AI Platform | DigitalOcean AI | Azure AI Foundry |
| Memory System | Memori (Same) | Memori (Same) |
| Backend | FastAPI | Python Script |
| Frontend | Next.js Web App | Console-based |
| API | RESTful endpoints | Function calls |
| Deployment | Containerizable | Script execution |

## 🚀 Deployment

### Backend Deployment
```bash
# Using Docker (recommended)
docker build -t smart-shopping-backend .
docker run -p 8000:8000 --env-file .env smart-shopping-backend

# Or using cloud platforms
# Deploy to DigitalOcean App Platform, Heroku, etc.
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel, Netlify, or any static hosting
# Ensure NEXT_PUBLIC_API_URL points to your backend
```

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
- **Service not initialized**: Check DigitalOcean credentials in `.env`
- **Memory errors**: Ensure SQLite database is writable
- **CORS errors**: Verify frontend URL in CORS middleware

### Frontend Issues
- **API connection failed**: Verify backend is running on port 8000
- **Build errors**: Check Next.js and TypeScript configuration
- **Styling issues**: Ensure Tailwind CSS is properly configured

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
- **This Demo**: Create an issue in the repository

---

**Smart Shopping with AI Memory - Making every shopping experience personal! 🛍️🤖**
