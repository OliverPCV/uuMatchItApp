// tournamentService.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

export const fetchTournaments = async () => {
    try {
        const response = await axiosInstance.get("/tournaments");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw error;
    }
};

export const fetchTournamentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/tournaments/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tournament with id ${id}:`, error);
        throw error;
    }
};

export const fetchTournamentByOwner = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.get(`/tournaments/mine`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tournament with id ${id}:`, error);
        throw error;
    }
};

export const createTournament = async (tournamentData) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        console.log(tournamentData);

        const response = await axiosInstance.post('/tournaments', tournamentData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
};

export const joinTournament = async (tournamentId, teamId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.post(`/tournaments/${tournamentId}/join`, null, {
            params: { teamId },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error joining tournament with id ${tournamentId}:`, error);
        throw error;
    }
};

export const leaveTournament = async (tournamentId, teamId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');
    
        const response = await axiosInstance.post(`/tournaments/${tournamentId}/leave`, null, {
            params: { teamId },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error leaving tournament with id ${tournamentId}:`, error);
        throw error;
    }
}

export const deleteTournament = async (tournamentId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.delete(`/tournaments/${tournamentId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error deleting tournament with id ${tournamentId}:`, error);
        throw error;
    }
}
