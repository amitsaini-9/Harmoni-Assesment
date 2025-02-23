import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "https://fakestoreapi.com";

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API endpoints
export const endpoints = {
  products: "/products",
  categories: "/products/categories",
  productsByCategory: (category) => `/products/category/${category}`,
  product: (id) => `/products/${id}`,
};

// Error messages
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  TIMEOUT: "Request timed out. Please try again.",
  NOT_FOUND: "Resource not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  DEFAULT: "Something went wrong. Please try again.",
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.response.data?.message || ERROR_MESSAGES.DEFAULT;
    }
  } else if (error.request) {
    // Request was made but no response
    if (error.code === "ECONNABORTED") {
      return ERROR_MESSAGES.TIMEOUT;
    }
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  return ERROR_MESSAGES.DEFAULT;
};

// API service functions with error handling
export const apiService = {
  async getProducts() {
    try {
      const response = await api.get(endpoints.products);
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  },

  async getProduct(id) {
    try {
      const response = await api.get(endpoints.product(id));
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  },

  async getCategories() {
    try {
      const response = await api.get(endpoints.categories);
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  },

  async getProductsByCategory(category) {
    try {
      if (!category) {
        throw new Error("Category is required");
      }
      const response = await api.get(endpoints.productsByCategory(category));
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  },

  async fetchWithErrorHandling(url) {
    try {
      const response = await api.get(url);
      return { data: response.data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    }
  },
};

export default apiService;
