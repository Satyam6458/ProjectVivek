/**
 * Shree Dhaan - Centralized API Service
 * Backend URL: https://backend-vivek.vercel.app/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-vivek.vercel.app/api';

/**
 * Universal API Request Handler
 * Automatically handles JSON serialization, headers, and authtoken authentication.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Retrieve stored JWT token from localStorage
  const token = localStorage.getItem('shree_dhaan_token');
  if (token) {
    // Send token in both 'authtoken' and 'Authorization' for maximum backend compatibility
    headers['authtoken'] = token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.message || data.error || `HTTP error! Status: ${response.status}`;
      const err = new Error(errorMessage);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || 'GET'} ${url}:`, error);
    throw error;
  }
}

export const api = {
  baseUrl: BASE_URL,

  // ==========================================
  // 1. System Health Check
  // ==========================================
  health: {
    check: () => request('/health', { method: 'GET' }),
  },

  // ==========================================
  // 2. Authentication APIs
  // ==========================================
  auth: {
    /**
     * Register a new user or admin
     * @param {Object} payload - { name, email, role: 'user'|'admin', password, phone }
     */
    signup: (payload) =>
      request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    /**
     * Sign in with email/phone and password
     * @param {Object} credentials - { email, password }
     */
    signin: (credentials) =>
      request('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),

    /**
     * Fetch authenticated user details via authtoken header
     */
    getUserDetails: () =>
      request('/auth/userdetails', {
        method: 'GET',
      }),

    /**
     * Admin: Fetch all registered users (customers and admins)
     */
    getAllUsers: () =>
      request('/auth/allusers', {
        method: 'GET',
      }),
  },

  // ==========================================
  // 3. Inquiries Management APIs
  // ==========================================
  inquiries: {
    /**
     * Public submission of a customer/distributor inquiry
     * @param {Object} inquiryData - { full_name, email, phone_number, inquiry_type, message }
     */
    submit: (inquiryData) =>
      request('/inquiries/addinquirydetails', {
        method: 'POST',
        body: JSON.stringify(inquiryData),
      }),

    /**
     * Admin: Fetch all inquiries with optional filters
     * @param {Object} query - { status, inquiry_type, search }
     */
    getAll: (query = {}) => {
      const params = new URLSearchParams();
      if (query.status && query.status !== 'ALL') params.append('status', query.status);
      if (query.inquiry_type && query.inquiry_type !== 'ALL') params.append('inquiry_type', query.inquiry_type);
      if (query.search) params.append('search', query.search);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      return request(`/inquiries/getinquirydetails${queryString}`, { method: 'GET' });
    },

    /**
     * Admin: Get single inquiry by ID
     */
    getById: (id) => request(`/inquiries/getinquirydetails/${id}`, { method: 'GET' }),

    /**
     * Admin: Update inquiry status and resolution notes
     * @param {string} id
     * @param {Object} updateData - { status, resolution_notes }
     */
    update: (id, updateData) =>
      request(`/inquiries/updateinquirydetails/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      }),

    /**
     * Admin: Delete inquiry
     * @param {string} id
     */
    delete: (id) =>
      request(`/inquiries/deleteinquirydetails/${id}`, {
        method: 'DELETE',
      }),
  },

  // ==========================================
  // 4. Products Management APIs
  // ==========================================
  products: {
    /**
     * Public: Fetch all products
     */
    getAll: () => request('/products/getproductdetails', { method: 'GET' }),

    /**
     * Public: Fetch single product by ID
     */
    getById: (id) => request(`/products/getproductdetails/${id}`, { method: 'GET' }),

    /**
     * Admin: Add new product
     */
    create: (productData) =>
      request('/products/addproductdetails', {
        method: 'POST',
        body: JSON.stringify(productData),
      }),

    /**
     * Admin: Update product
     */
    update: (id, productData) =>
      request(`/products/updateproductdetails/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      }),

    /**
     * Admin: Delete product
     */
    delete: (id) =>
      request(`/products/deleteproductdetails/${id}`, {
        method: 'DELETE',
      }),
  },

  // ==========================================
  // 5. Stores APIs
  // ==========================================
  stores: {
    getAll: () => request('/stores/getstoredetails', { method: 'GET' }),
    create: (storeData) =>
      request('/stores/addstoredetails', {
        method: 'POST',
        body: JSON.stringify(storeData),
      }),
    update: (id, storeData) =>
      request(`/stores/updatestoredetails/${id}`, {
        method: 'PUT',
        body: JSON.stringify(storeData),
      }),
    delete: (id) =>
      request(`/stores/deletestoredetails/${id}`, {
        method: 'DELETE',
      }),
  },
};

export default api;
