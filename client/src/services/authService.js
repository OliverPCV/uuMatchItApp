// authService.js
import axios, { all } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const fetchUserData = async () => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.get('/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
};

export const fetchUserTeams = async () => {
    let userId;
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const userData = await fetchUserData();
        userId = userData.id;

        const response = await axiosInstance.get('/teams', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const allTeams = response.data;
        
        const userTeams = allTeams.filter(team => team.owner.id === userId);
        console.log(userTeams);
        return userTeams;
    } catch (error) {
        console.error(`Error fetching teams for user id ${userId}:`, error);
        throw error;
    }
};
