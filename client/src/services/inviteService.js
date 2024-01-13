// authService.js
import axios, { all } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const fetchSendInvite = async (teamId, userName) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.post(`/invites/`, null, {
            params: { teamId, userName },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};