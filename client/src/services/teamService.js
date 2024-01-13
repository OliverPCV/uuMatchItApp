import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const fetchTeamData = async () => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axiosInstance.get('/teams', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchTeamById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');
    
        const response = await axiosInstance.get(`/teams/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching team with id ${id}:`, error);
        throw error;
    }
    }
    
