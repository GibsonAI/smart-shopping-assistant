#!/usr/bin/env python3
"""
Smart Shopping Assistant Backend - DigitalOcean + Memori Integration

A FastAPI backend for an AI-powered shopping assistant that remembers
customer preferences using DigitalOcean AI agents and Memori.

Features:
- RESTful API for chat interactions
- Customer preference learning
- Purchase history tracking
- Product catalog management
- Memory-enhanced recommendations

Requirements:
- pip install memorisdk openai python-dotenv fastapi uvicorn
- Set agent_endpoint and agent_access_key in environment or .env file

Usage:
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

import os
from datetime import datetime
from typing import Dict, List, Optional

import openai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from memori import Memori, create_memory_tool

# Load environment variables
load_dotenv()

# Check for DigitalOcean credentials
agent_endpoint = os.environ.get("agent_endpoint")
agent_access_key = os.environ.get("agent_access_key")
openai_api_key = os.environ.get("OPENAI_API_KEY")

# Constants
DATABASE_PATH = "sqlite:///smart_shopping_digitalocean.db"
NAMESPACE = "smart_shopping_digitalocean"

# Mock product database - same as Azure version for consistency
PRODUCT_CATALOG = {
    "electronics": [
        {
            "id": "iphone15",
            "name": "iPhone 15 Pro",
            "price": 999,
            "rating": 4.8,
            "category": "smartphone",
            "description": "Latest iPhone with Pro camera system and titanium design",
            "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880",
        },
        {
            "id": "macbook",
            "name": "MacBook Air M2",
            "price": 1199,
            "rating": 4.9,
            "category": "laptop",
            "description": "Powerful M2 chip with all-day battery life",
            "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840",
        },
        {
            "id": "airpods",
            "name": "AirPods Pro",
            "price": 249,
            "rating": 4.7,
            "category": "audio",
            "description": "Active noise cancellation and spatial audio",
            "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2000&hei=2000",
        },
        {
            "id": "ipad",
            "name": "iPad Air",
            "price": 599,
            "rating": 4.6,
            "category": "tablet",
            "description": "Versatile iPad with M1 chip for creativity and productivity",
            "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112",
        },
    ],
    "clothing": [
        {
            "id": "nike_shoes",
            "name": "Nike Air Max",
            "price": 120,
            "rating": 4.5,
            "category": "footwear",
            "description": "Comfortable running shoes with Air Max cushioning",
            "image": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/air-max-90-mens-shoes-6n7391.png",
        },
        {
            "id": "levi_jeans",
            "name": "Levi's 501 Jeans",
            "price": 80,
            "rating": 4.4,
            "category": "pants",
            "description": "Classic straight-leg jeans with authentic fit",
            "image": "https://lsco.scene7.com/is/image/lsco/005010000-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.9,1.0,8,0&iccEmbed=0&printRes=72&_tparam_layer_1_src=sw/005010000-front-pdp&_tparam_layer_1_anchor=c&_tparam_layer_1_origin=1",
        },
        {
            "id": "sweater",
            "name": "Cashmere Sweater",
            "price": 150,
            "rating": 4.6,
            "category": "tops",
            "description": "Luxurious 100% cashmere sweater for ultimate comfort",
            "image": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=500&fit=crop",
        },
    ],
    "home": [
        {
            "id": "coffee_maker",
            "name": "Breville Coffee Maker",
            "price": 300,
            "rating": 4.7,
            "category": "kitchen",
            "description": "Professional-grade espresso machine for home use",
            "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        },
        {
            "id": "vacuum",
            "name": "Dyson V15",
            "price": 450,
            "rating": 4.8,
            "category": "cleaning",
            "description": "Powerful cordless vacuum with laser detect technology",
            "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop",
        },
        {
            "id": "mattress",
            "name": "Memory Foam Mattress",
            "price": 800,
            "rating": 4.5,
            "category": "bedroom",
            "description": "Premium memory foam for optimal sleep comfort",
            "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
        },
    ],
    "books": [
        {
            "id": "ai_book",
            "name": "AI for Everyone",
            "price": 25,
            "rating": 4.3,
            "category": "technology",
            "description": "Non-technical guide to understanding artificial intelligence",
            "image": "https://images.unsplash.com/photo-1485988512492-1d364fe2c5ac?w=500&h=500&fit=crop",
        },
        {
            "id": "cookbook",
            "name": "Mediterranean Cookbook",
            "price": 30,
            "rating": 4.6,
            "category": "cooking",
            "description": "Authentic Mediterranean recipes for healthy living",
            "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
        },
    ],
}

# FastAPI app initialization
app = FastAPI(
    title="Smart Shopping Assistant API",
    description="DigitalOcean + Memori powered shopping assistant",
    version="1.0.0",
)

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://preview--smart-shopping-assistant-fastapi.lovable.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class ChatRequest(BaseModel):
    message: str
    customer_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    response: str
    timestamp: str


class Product(BaseModel):
    id: str
    name: str
    price: float
    rating: float
    category: str
    description: str
    image: str


class ProductSearchRequest(BaseModel):
    category: Optional[str] = None
    max_price: Optional[float] = None
    min_rating: Optional[float] = None
    query: Optional[str] = None


# Global variables for DigitalOcean client and memory system
digitalocean_client = None
memory_system = None
memory_tool = None


def initialize_services():
    """Initialize DigitalOcean client and memory system"""
    global digitalocean_client, memory_system, memory_tool

    if not agent_endpoint or not agent_access_key:
        print("❌ Warning: DigitalOcean AI credentials not found in environment")
        print("Please set: agent_endpoint and agent_access_key")
        return False

    # Initialize DigitalOcean client
    base_url = (
        agent_endpoint
        if agent_endpoint.endswith("/api/v1/")
        else f"{agent_endpoint}/api/v1/"
    )

    digitalocean_client = openai.OpenAI(
        base_url=base_url,
        api_key=agent_access_key,
    )

    # Initialize Memori memory system
    memory_system = Memori(
        database_connect=DATABASE_PATH,
        conscious_ingest=True,
        verbose=False,
        namespace=NAMESPACE,
        openai_api_key=openai_api_key,
    )
    memory_system.enable()

    # Create memory tool
    memory_tool = create_memory_tool(memory_system)

    print("✅ Services initialized successfully")
    return True


def search_products_in_catalog(
    category: Optional[str] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    query: Optional[str] = None,
) -> List[Dict]:
    """Search products in the catalog with filters"""
    products = []

    # Collect all products
    for cat_name, cat_products in PRODUCT_CATALOG.items():
        for product in cat_products:
            # Apply filters
            if category and category.lower() not in [
                cat_name.lower(),
                product["category"].lower(),
            ]:
                continue
            if max_price and product["price"] > max_price:
                continue
            if min_rating and product["rating"] < min_rating:
                continue
            if query:
                query_lower = query.lower()
                product_text = f"{product['name']} {product['category']} {product['description']} {cat_name}".lower()
                if query_lower not in product_text:
                    continue

            products.append(product)

    return products


def chat_with_digitalocean(user_input: str, customer_id: str = "default") -> str:
    """Process user input with DigitalOcean AI and memory"""
    if not digitalocean_client or not memory_system:
        return "Service not initialized. Please check configuration."

    try:
        # Search memory for customer context
        customer_context = ""
        if len(user_input.strip()) > 5:
            try:
                context_result = memory_tool.execute(
                    query=f"customer:{customer_id} {user_input[:100]}"
                )
                if (
                    context_result
                    and "No relevant memories found" not in context_result
                ):
                    customer_context = f"\n\nCustomer history: {context_result[:500]}"
            except Exception:
                pass

        # Get available products for context
        available_products = []
        for _category, products in PRODUCT_CATALOG.items():
            for product in products:
                available_products.append(
                    f"- {product['name']} (${product['price']}) - {product['description']}"
                )

        products_context = "\n".join(available_products[:10])  # Limit to 10 products

        # Create enhanced prompt
        system_prompt = f"""You are a friendly AI shopping assistant for an online store. You help customers find products and provide personalized recommendations.

Available Products in Our Store:
{products_context}

Guidelines:
1. Be conversational and helpful
2. Recommend specific products from our catalog with prices
3. Ask clarifying questions if needed
4. Use customer history to personalize recommendations
5. Be direct about what we have available
6. Don't claim to have products not in our catalog
7. Focus on helping customers find the best products for their needs

Your goal is to provide helpful shopping assistance and product recommendations."""

        enhanced_input = user_input
        if customer_context:
            enhanced_input = f"{user_input}{customer_context}"

        # Get response from DigitalOcean AI
        response = digitalocean_client.chat.completions.create(
            model="n/a",  # DigitalOcean uses "n/a" as model parameter
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": enhanced_input},
            ],
        )

        ai_response = response.choices[0].message.content

        # Record conversation in memory
        memory_system.record_conversation(
            user_input=f"[Customer:{customer_id}] {user_input}",
            ai_output=ai_response,
            model="digitalocean",
            metadata={
                "platform": "digitalocean",
                "customer_id": customer_id,
                "interaction_type": "shopping_assistance",
                "had_context": bool(customer_context),
            },
        )

        return ai_response

    except Exception as e:
        error_msg = f"Sorry, I encountered an error: {str(e)}"
        try:
            memory_system.record_conversation(
                user_input=f"[Customer:{customer_id}] {user_input}",
                ai_output=error_msg,
                model="digitalocean",
                metadata={
                    "platform": "digitalocean",
                    "customer_id": customer_id,
                    "error": True,
                },
            )
        except:
            pass
        return error_msg


# API Routes


@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    initialize_services()


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Smart Shopping Assistant API is running", "status": "healthy"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the shopping assistant"""
    if not digitalocean_client:
        raise HTTPException(
            status_code=500,
            detail=f"DigitalOcean service not initialized {agent_endpoint}",
        )

    response = chat_with_digitalocean(request.message, request.customer_id)

    return ChatResponse(response=response, timestamp=datetime.now().isoformat())


@app.get("/products", response_model=List[Product])
async def get_all_products():
    """Get all available products"""
    products = []
    for category_products in PRODUCT_CATALOG.values():
        products.extend(category_products)
    return products


@app.post("/products/search", response_model=List[Product])
async def search_products(request: ProductSearchRequest):
    """Search products with filters"""
    products = search_products_in_catalog(
        category=request.category,
        max_price=request.max_price,
        min_rating=request.min_rating,
        query=request.query,
    )
    return products


@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a specific product by ID"""
    for category_products in PRODUCT_CATALOG.values():
        for product in category_products:
            if product["id"] == product_id:
                return product

    raise HTTPException(status_code=404, detail="Product not found")


@app.get("/categories")
async def get_categories():
    """Get all product categories"""
    return {"categories": list(PRODUCT_CATALOG.keys())}


@app.get("/memory/search")
async def search_memory(query: str):
    """Search customer memory (for debugging/admin)"""
    if not memory_tool:
        raise HTTPException(status_code=500, detail="Memory service not initialized")

    try:
        result = memory_tool.execute(query=query)
        return {"query": query, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Memory search error: {str(e)}")


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
