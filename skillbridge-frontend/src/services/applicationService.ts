import axiosInstance from '../utils/axiosConfig';
import { JobApplication } from '../types';

export const applicationService = {
    createApplication: async (data: any) => {
        const response = await axiosInstance.post<JobApplication>('/applications', data);
        return response.data;
    },

    getApplications: async (page: number = 0, size: number = 10) => {
        const response = await axiosInstance.get('/applications', {
            params: { page, size },
        });
        return response.data;
    },

    getApplicationById: async (id: number) => {
        const response = await axiosInstance.get<JobApplication>(`/applications/${id}`);
        return response.data;
    },

    updateApplication: async (id: number, data: any) => {
        const response = await axiosInstance.put<JobApplication>(`/applications/${id}`, data);
        return response.data;
    },

    deleteApplication: async (id: number) => {
        await axiosInstance.delete(`/applications/${id}`);
    },
};
