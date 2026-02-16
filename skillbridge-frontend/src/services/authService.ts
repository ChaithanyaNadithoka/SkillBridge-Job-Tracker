import axiosInstance from '../utils/axiosConfig';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
    register: async (data: RegisterRequest) => {
        const response = await axiosInstance.post<string>('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginRequest) => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: () => localStorage.getItem('token'),
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};
