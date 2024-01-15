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
};

export const createTeam = async (teamData) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        console.log(teamData);

        const response = await axiosInstance.post('/teams', teamData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

export const deleteTeam = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.delete(`/teams/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error deleting team with id ${id}:`, error);
        throw error;
    }
}

export const removeUserFromTeam = async (teamId, userId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.delete(`/teams/${teamId}/kick`, {
            params: { userId },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error removing user with id ${userId} from team with id ${teamId}:`, error);
        throw error;
    }
}

