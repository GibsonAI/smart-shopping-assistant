import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  image: string;
}

export interface ChatRequest {
  message: string;
  customer_id?: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export interface ProductSearchRequest {
  category?: string;
  max_price?: number;
  min_rating?: number;
  query?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async sendMessage(message: string, customerId: string = 'default'): Promise<ChatResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/chat`, {
        message,
        customer_id: customerId,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseURL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async searchProducts(filters: ProductSearchRequest): Promise<Product[]> {
    try {
      const response = await axios.post(`${this.baseURL}/products/search`, filters);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      const response = await axios.get(`${this.baseURL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseURL}/categories`);
      return response.data.categories || response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async searchMemory(query: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/memory/search`, {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching memory:', error);
      throw new Error('Failed to search memory');
    }
  }
}

export const apiService = new ApiService();