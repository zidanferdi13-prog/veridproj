/**
 * API Client - Base configuration for all API requests
 * Handles authentication, error handling, and request/response interceptors
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Get authentication token from storage or context
 */
const getAuthToken = () => {
  // Try to get token from localStorage
  const token = localStorage.getItem('authToken');
  return token;
};

/**
 * API Client class to handle all HTTP requests
 */
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Build full URL with query parameters
   */
  buildURL(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });
    
    return url.toString();
  }

  /**
   * Get default headers with authentication
   */
  getHeaders(customHeaders = {}) {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle response and parse JSON
   */
  async handleResponse(response) {
    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText || 'An error occurred',
      }));
      
      throw {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        message: errorData.message || errorData.error || 'An error occurred',
      };
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @param {object} headers - Custom headers
   */
  async get(endpoint, params = {}, headers = {}) {
    try {
      const url = this.buildURL(endpoint, params);
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(headers),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} headers - Custom headers
   */
  async post(endpoint, data = {}, headers = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(headers),
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} headers - Custom headers
   */
  async put(endpoint, data = {}, headers = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getHeaders(headers),
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} headers - Custom headers
   */
  async patch(endpoint, data = {}, headers = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getHeaders(headers),
        body: JSON.stringify(data),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PATCH request failed:', error);
      throw error;
    }
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} headers - Custom headers
   */
  async delete(endpoint, headers = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.getHeaders(headers),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  /**
   * POST request with FormData (for file uploads)
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - FormData object
   * @param {object} headers - Custom headers
   */
  async postFormData(endpoint, formData, headers = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = getAuthToken();
      const customHeaders = { ...headers };
      
      // Don't set Content-Type for FormData, browser will set it with boundary
      if (token) {
        customHeaders['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: customHeaders,
        body: formData,
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST FormData request failed:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

export default apiClient;

