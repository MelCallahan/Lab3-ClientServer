import axios from 'axios';

// Base URL for your backend (adjust if necessary)
const API_URL = 'http://localhost:5000/api/genres';

// Get all genres
const getAllGenres = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error; // Propagate the error to handle it in the component
    }
};

// Get a single genre by ID
const getGenre = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching genre with ID ${id}:`, error);
        throw error;
    }
};

// Create a new genre
const createGenre = async (name) => {
    try {
        const response = await axios.post(API_URL, { name });
        return response.data;
    } catch (error) {
        console.error('Error creating genre:', error);
        throw error;
    }
};

// Update an existing genre
const updateGenre = async (id, name) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(`Error updating genre with ID ${id}:`, error);
        throw error;
    }
};

// Delete a genre
const deleteGenre = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting genre with ID ${id}:`, error);
        throw error;
    }
};

export default {
    getAllGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
};
