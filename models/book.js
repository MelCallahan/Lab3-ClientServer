const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        Book_ID: {
            type: Number,
            required: true,
            unique: true // Ensure uniqueness of the custom ID
        },
        title: { type: String, required: true },
        author: { type: String, required: true },
        price: { type: Number, required: true },
        genre: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Genre', 
            required: true // Reference to the Genre model
        },
        description: { type: String, required: false }, // Added description field
        copies_left: { type: Number, required: true },
        coverImage: { type: String, required: false },
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;