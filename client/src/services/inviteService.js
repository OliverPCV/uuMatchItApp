// authService.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const fetchSendInvite = async (teamId, userName) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.post('/invites', null, {
            params: { teamId, user: userName },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending invite:', error);
        throw error;
    }
};

export const fetchAcceptInvite = async (inviteId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.put(`/invites/${inviteId}`, null, {
            params: { state: 'ACCEPTED' },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error accepting invite:', error);
        throw error;
    }
};

export const fetchDeclineInvite = async (inviteId) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.put(`/invites/${inviteId}`, null, {
            params: { state: 'DECLINED' },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error declining invite:', error);
        throw error;
    }
};

export const fetchInvites = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.get('/invites', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching invites:', error);
        throw error;
    }
};

export const fetchInviteById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.get(`/invites/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching invite with id ${id}:`, error);
        throw error;
    }
}
