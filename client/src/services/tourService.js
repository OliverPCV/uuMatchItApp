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
