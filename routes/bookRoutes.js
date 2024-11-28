const express = require('express');
const bookController = require('../controllers/bookController');
const upload = require('../uploads/upload');

const router = express.Router();

// Book Routes
router.get('/', bookController.getAllBooks);
router.get('/:Book_ID', bookController.getBook);
router.post('/', upload.single('coverImage'), bookController.createBook);
router.put('/:Book_ID', upload.single('coverImage'), bookController.updateBook); // Add file upload middleware
router.delete('/:Book_ID', bookController.deleteBook);

module.exports = router;
