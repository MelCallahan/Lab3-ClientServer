const Genre = require('../models/genre');

// Retrieve all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        console.error('Error retrieving genres:', error);
        res.status(500).json({ error: 'Error retrieving genres' });
    }
};

// Retrieve a particular genre by ID
const getGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findById(id);
        if (!genre) return res.status(404).json({ error: 'Genre not found' });
        res.json(genre);
    } catch (error) {
        console.error('Error retrieving genre:', error);
        res.status(500).json({ error: 'Error retrieving genre' });
    }
};

// Create a new genre
const createGenre = async (req, res) => {
    const { name } = req.body;
    try {
        const newGenre = new Genre({ name });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(400).json({ error: 'Error creating genre' });
    }
};

// Update an existing genre
const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedGenre) return res.status(404).json({ error: 'Genre not found' });
        res.json(updatedGenre);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(400).json({ error: 'Error updating genre' });
    }
};

// Delete a genre
const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGenre = await Genre.findByIdAndDelete(id);
        if (!deletedGenre) return res.status(404).json({ error: 'Genre not found' });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ error: 'Error deleting genre' });
    }
};

module.exports = {
    getAllGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
};