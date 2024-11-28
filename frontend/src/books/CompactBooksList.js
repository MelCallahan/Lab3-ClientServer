import React, { useState, useEffect } from 'react';
import BookServices from './BookServices';
import { Link } from 'react-router-dom';

const CompactBooksList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await BookServices.getAllBooks();
                setBooks(data.slice(0, 6)); // Limit to 6 books for the homepage
                setLoading(false);
            } catch (err) {
                setError('Failed to load books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading books...</div>;
    }

    if (error) {
        return <div className="text-center text-danger mt-5">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Featured Books</h2>
            {books.length === 0 ? (
                <p className="text-center">No books available.</p>
            ) : (
                <div
                    className="grid-container"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', // Three equal sections
                        gap: '30px', // Space between items
                    }}
                >
                    {books.map((book, index) => (
                        <div
                            key={book.Book_ID}
                            className="card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'justify',
                                padding: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                height: '100%',
                            }}
                        >
                            <div className="text-center">
                                {book.coverImage && (
                                    <Link to={`/all-books/${book.Book_ID}`}>
                                        <img
                                            src={`http://localhost:5000/uploads/${book.coverImage}`}
                                            alt={`${book.title} cover`}
                                            style={{
                                                width: '100%',
                                                maxHeight: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                            }}
                                        />
                                    </Link>
                                )}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">{book.title}</h5>
                                <p className="card-text text-center text-muted">
                                    by {book.author}
                                </p>
                            </div>
                            <div className="card-footer text-center">
                                <Link to={`/all-books/${book.Book_ID}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompactBooksList;
