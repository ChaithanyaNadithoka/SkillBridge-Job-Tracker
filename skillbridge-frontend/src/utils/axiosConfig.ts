import axios, { AxiosInstance } from 'axios';
import API_BASE_URL from '../config/constants';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include HTTP Basic Auth credentials
axiosInstance.interceptors.request.use(
    (config) => {
        // Don't attach Authorization header to auth endpoints (login/register)
        const url = config.url || '';
        if (url.includes('/auth/login') || url.includes('/auth/register')) {
            return config;
        }

        const credentials = localStorage.getItem('credentials');
        if (credentials) {
            // Add Authorization header with Basic Auth for protected endpoints
            config.headers.Authorization = `Basic ${credentials}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear stored credentials on unauthorized
            localStorage.removeItem('credentials');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
