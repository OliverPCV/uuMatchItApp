// authService.js
import axios from 'axios';

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
