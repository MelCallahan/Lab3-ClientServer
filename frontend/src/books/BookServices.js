import axios from 'axios';

// Base URL for your backend (adjust if necessary)
const API_URL = 'http://localhost:5000/api/books';

// Get all books, optionally filtered by genre
const getAllBooks = async (genre = null) => {
    try {
        const response = await axios.get(API_URL, {
            params: genre ? { genre } : {}, // Add genre as a query parameter if provided
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Propagate the error to handle it in the component
    }
};

// Get a single book by Book_ID
const getBook = async (Book_ID) => {
    try {
        const response = await axios.get(`${API_URL}/${Book_ID}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with ID ${Book_ID}:`, error);
        throw error;
    }
};

// Create a new book
const createBook = async (bookData) => {
    try {
        const response = await axios.post(API_URL, bookData);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Update an existing book by Book_ID
const updateBook = async (Book_ID, bookData) => {
    try {
        const response = await axios.put(`${API_URL}/${Book_ID}`, bookData);
        return response.data;
    } catch (error) {
        console.error(`Error updating book with ID ${Book_ID}:`, error);
        throw error;
    }
};

// Delete a book by Book_ID
const deleteBook = async (Book_ID) => {
    try {
        await axios.delete(`${API_URL}/${Book_ID}`);
    } catch (error) {
        console.error(`Error deleting book with ID ${Book_ID}:`, error);
        throw error;
    }
};

export default {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
