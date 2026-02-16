import axiosInstance from '../utils/axiosConfig';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

// Helper function to encode credentials as Base64 for Basic Auth
const encodeCredentials = (email: string, password: string): string => {
    return btoa(`${email}:${password}`);
};

export const authService = {
    register: async (data: RegisterRequest) => {
        const response = await axiosInstance.post<string>('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginRequest) => {
        // Encode credentials for Basic Auth
        const encodedCredentials = encodeCredentials(data.email, data.password);
        
        const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
        
        // Store user info and credentials for future requests
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            // Store encoded credentials for Basic Auth in subsequent requests
            localStorage.setItem('credentials', encodedCredentials);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('credentials');
        localStorage.removeItem('user');
    },

    getCredentials: () => localStorage.getItem('credentials'),
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};
