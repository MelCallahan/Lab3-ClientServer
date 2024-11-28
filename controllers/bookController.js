const Book = require('../models/book');
const Counter = require('../models/counter');

// Retrieve all books with genre name populated
const getAllBooks = async (req, res) => {
    const { genre } = req.query;
    try {
        const query = genre ? { genre } : {};
        const books = await Book.find(query).populate('genre', 'name');
        res.json(books);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'An error occurred while retrieving books.' });
    }
};

// Retrieve a single book by custom integer ID
const getBook = async (req, res) => {
    const { Book_ID } = req.params;
    try {
        const book = await Book.findOne({ Book_ID }).populate('genre', 'name');
        if (!book) return res.status(404).json({ error: 'Book not found.' });
        res.json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the book.' });
    }
};

// Create a new book
const createBook = async (req, res) => {
    const { title, author, price, genre, description, copies_left } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    try {
        // Generate a custom integer ID
        const counter = await Counter.findOneAndUpdate(
            { Book_ID: 'bookId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newBook = new Book({
            Book_ID: counter.seq,
            title,
            author,
            price,
            genre, // Should be a valid ObjectId
            description,
            copies_left,
            coverImage,
        });

        await newBook.save();
        res.status(201).json({ message: 'Book created successfully.', book: newBook });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'An error occurred while creating the book.' });
    }
};

// Update a book by custom integer ID
const updateBook = async (req, res) => {
    const { Book_ID } = req.params;
    const { title, author, price, genre, description, copies_left } = req.body;
    const coverImage = req.file ? req.file.filename : undefined; // Handle optional file upload

    try {
        const updateFields = { title, author, price, genre, description, copies_left };
        if (coverImage) updateFields.coverImage = coverImage; // Only update if a new image is uploaded

        const updatedBook = await Book.findOneAndUpdate(
            { Book_ID },
            updateFields,
            { new: true }
        );

        if (!updatedBook) return res.status(404).json({ error: 'Book not found.' });
        res.json({ message: 'Book updated successfully.', book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
};

// Delete a book by custom integer ID
const deleteBook = async (req, res) => {
    const { Book_ID } = req.params;

    try {
        const deletedBook = await Book.findOneAndDelete({ Book_ID });
        if (!deletedBook) return res.status(404).json({ error: 'Book not found.' });
        res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
};

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
