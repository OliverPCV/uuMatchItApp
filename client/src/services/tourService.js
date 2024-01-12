// tournamentService.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const fetchTournaments = async () => {
  try {
    const response = await axiosInstance.get("/tournaments");
    console.log(response.data); // Logování dat pro kontrolu
    return response.data;
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }
};
