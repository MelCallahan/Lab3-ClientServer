import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookServices from './BookServices'; // Adjust the import based on your project structure

const BookDetail = () => {
    const { id } = useParams(); // Extract the book ID from the URL
    const [book, setBook] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const fetchedBook = await BookServices.getBook(id);
                setBook(fetchedBook);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setMessage('Failed to load book details.');
            }
        };

        fetchBookDetails();
    }, [id]);

    if (message) {
        return <p className="error-message">{message}</p>;
    }

    if (!book) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Book Details📖</h2>
            <div style={styles.card}>
                <div style={styles.imageContainer}>
                    {book.coverImage && (
                        <img
                            src={`http://localhost:5000/uploads/${book.coverImage}`}
                            alt={`${book.title} cover`}
                            style={styles.coverImage}
                        />
                    )}
                </div>
                <div style={styles.detailsContainer}>
                    <h3 style={styles.bookTitle}>{book.title}</h3>
                    <p style={styles.detail}>
                        <strong>Author:</strong> {book.author}
                    </p>
                    <p style={styles.detail}>
                        <strong>Price:</strong> ${book.price}
                    </p>
                    <p style={styles.detail}>
                        <strong>Genre:</strong> {book.genre ? book.genre.name : 'N/A'}
                    </p>
                    <p style={styles.detail}>
                        <strong>Description:</strong> {book.description}
                    </p>
                    <p style={styles.detail}>
                        <strong>Copies Left:</strong> {book.copies_left}
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px',
    },
    card: {
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    coverImage: {
        width: '150px',
        height: 'auto',
        borderRadius: '5px',
    },
    detailsContainer: {
        flex: 2,
        padding: '20px',
        color: '#555',
    },
    bookTitle: {
        fontSize: '1.8rem',
        color: '#444',
        marginBottom: '10px',
    },
    detail: {
        fontSize: '1rem',
        margin: '10px 0',
    },
};

export default BookDetail;
