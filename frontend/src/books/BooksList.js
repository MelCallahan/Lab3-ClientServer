import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookServices from './BookServices';
import GenreServices from '../genres/GenreServices';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch books and genres concurrently
                const [booksData, genresData] = await Promise.all([
                    BookServices.getAllBooks(),
                    GenreServices.getAllGenres() // Assuming this method exists
                ]);

                setBooks(booksData);
                setFilteredBooks(booksData);
                setGenres(genresData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load books or genres');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter books by genre
    useEffect(() => {
        if (selectedGenre) {
            const filtered = books.filter(book => 
                book.genre?.name === selectedGenre || 
                book.genre?.id === selectedGenre
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks(books);
        }
    }, [selectedGenre, books]);

    const handleDelete = async (bookId) => {
        try {
            // Use a more resilient confirmation method
            const confirmDelete = window.confirm('Are you sure you want to delete this book?');
            
            if (confirmDelete) {
                await BookServices.deleteBook(bookId);
                // Update both books and filtered books states
                const updatedBooks = books.filter(book => book.Book_ID !== bookId);
                setBooks(updatedBooks);
                setFilteredBooks(updatedBooks);
            }
        } catch (err) {
            console.error('Error deleting book:', err);
            alert('Failed to delete the book. Please try again.');
        }
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    if (loading) {
        return <div className="text-center mt-5">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-danger mt-5">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={styles.title}>Book List 📚</h1>
            
            {/* Genre Filter Dropdown */}
            <div className="mb-4 text-center">
                <select 
                    value={selectedGenre} 
                    onChange={handleGenreChange} 
                    className="form-control w-50 mx-auto"
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            {filteredBooks.length === 0 ? (
                <p className="text-center">No books available.</p>
            ) : (
                <div style={styles.bookList}>
                    {filteredBooks.map((book) => (
                        <div key={book.Book_ID} style={styles.bookRow}>
                            {book.coverImage && (
                                <img
                                    src={`http://localhost:5000/uploads/${book.coverImage}`}
                                    alt={`${book.title} cover`}
                                    style={styles.bookImage}
                                    onError={(e) => {
                                        e.target.src = '/default-book-cover.png'; // Fallback image
                                        e.target.onerror = null; // Prevent infinite loop
                                    }}
                                />
                            )}
                            <div style={styles.bookInfo}>
                                <h3 style={styles.bookTitle}>
                                    <Link 
                                        to={`/all-books/${book.Book_ID}`} 
                                        style={styles.bookLink}
                                    >
                                        {book.title}
                                    </Link>
                                </h3>
                                <p style={styles.bookDescription}>
                                    {book.description || 'No description available'}
                                </p>
                                <p style={styles.bookDetails}>
                                    <strong>Author:</strong> {book.author || 'Unknown'} | 
                                    <strong>Genre:</strong> {book.genre?.name || 'Uncategorized'} | 
                                    <strong>Price:</strong> ${(book.price || 0).toFixed(2)}
                                </p>
                                <p style={styles.bookDetails}>
                                    <strong>Copies Left:</strong> {book.copies_left || 0}
                                </p>
                                <div style={styles.actions}>
                                    <Link
                                        to={`/edit-book/${book.Book_ID}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book.Book_ID)}
                                        className="btn btn-danger btn-sm ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Styles remain the same as in the original component
const styles = {
    bookList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    bookRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    bookImage: {
        width: '120px',
        height: 'auto',
        borderRadius: '5px',
        objectFit: 'cover', // Ensure image fits properly
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: '1.5rem',
        fontFamily: '"Merriweather", serif',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    bookLink: {
        textDecoration: 'none',
        color: '#000',
    },
    bookDescription: {
        marginBottom: '10px',
        color: '#555',
    },
    bookDetails: {
        fontSize: '0.9rem',
        color: '#777',
        marginBottom: '5px',
    },
    actions: {
        marginTop: '10px',
    },
    title: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
};

export default BooksList;