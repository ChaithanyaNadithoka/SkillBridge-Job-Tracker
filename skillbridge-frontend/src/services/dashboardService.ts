import axiosInstance from '../utils/axiosConfig';
import { DashboardStats } from '../types';

export const dashboardService = {
    getStats: async () => {
        const response = await axiosInstance.get<DashboardStats>('/dashboard/stats');
        return response.data;
    },
};
