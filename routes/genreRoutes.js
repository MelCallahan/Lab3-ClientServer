const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

// Genre Routes

// Genre Routes
router.get('/', genreController.getAllGenres); // Get all genres
router.get('/:id', genreController.getGenre); // Get a specific genre by ID
router.post('/', genreController.createGenre); // Create a new genre
router.put('/:id', genreController.updateGenre); // Update a genre
router.delete('/:id', genreController.deleteGenre); // Delete a genre

module.exports = router;