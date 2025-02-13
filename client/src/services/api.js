import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL de tu backend
});

export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export default api;