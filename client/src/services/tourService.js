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

export const editTournament = async (tournamentId, tournamentData) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axiosInstance.put(`/tournaments/${tournamentId}`, tournamentData, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.log('Error updating tournament:', error);
        throw error;
    }
}

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

export const startTournament = async (tournamentId) => {
    console.log(sessionStorage.getItem('token'));

    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axiosInstance.post(`/tournaments/${tournamentId}/start`, null, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Turnaj start ", response.data);
        return response.data;
    } catch (error) {
        console.error(`Error starting tournament with id ${tournamentId}:`, error);

        throw error;
    }
}

export const editMatch = async (tournamentId,matchId, matchData) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axiosInstance.post(`/tournaments/${tournamentId}/matches/${matchId}`, matchData, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        return response.data;
    } catch (error) {
        console.log('Error updating match:', error);
        throw error;
    }
}
