import axios from 'axios';

// Spring Boot Backend Base URL
const BASE_URL = 'https://silly-sfogliatella-c6a555.netlify.app';

// Create Central Axios Instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized Error Handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.warn('Unauthorized access. Token may be expired.');
          // localStorage.removeItem('token');
          // window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission for this resource.');
          break;
        case 404:
          console.error('Resource not found:', config?.url);
          break;
        case 500:
          console.error('Internal server error occurred on backend.');
          break;
        default:
          console.error(`API Error [${status}]:`, data?.message || error.message);
      }
    } else if (error.request) {
      console.error('Network Error: No response received from backend http://54.206.127.84:8080', error.message);
    } else {
      console.error('API Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
