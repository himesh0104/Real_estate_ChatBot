import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update this with your Django backend URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiService.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const analyzeRealEstate = async (query, filters = {}) => {
  try {
    const response = await apiService.get('/analyze/', {
      params: {
        query,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing real estate data:', error);
    throw error;
  }
};

export const getLocalities = async () => {
  try {
    const response = await apiService.get('/localities/');
    return response.data.localities || [];
  } catch (error) {
    console.error('Error fetching localities:', error);
    return [];
  }
};

export const getSampleQueries = async () => {
  try {
    const response = await apiService.get('/sample-queries/');
    return response.data.sample_queries || [];
  } catch (error) {
    console.error('Error fetching sample queries:', error);
    return [];
  }
};

export const exportAnalysis = async ({ format = 'csv', ...filters }) => {
  try {
    const response = await apiService.post(
      '/export/',
      {
        format,
        ...filters,
      },
      {
        responseType: 'blob',
      }
    );

    const disposition = response.headers['content-disposition'];
    const fallbackName = format === 'excel' ? 'real_estate_export.xlsx' : 'real_estate_export.csv';
    let filename = fallbackName;
    if (disposition) {
      const match = /filename="?([^";]+)"?/i.exec(disposition);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting analysis data:', error);
    throw error;
  }
};

// Export the axios instance in case it's needed directly
export default apiService;