import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookServices from './BookServices';
import GenreServices from '../genres/GenreServices';

const AddBook = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [copiesLeft, setCopiesLeft] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [genres, setGenres] = useState([]);
    const [message, setMessage] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await GenreServices.getAllGenres();
                setGenres(genreData);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        const fetchBookDetails = async () => {
            if (id) {
                setIsEdit(true);
                try {
                    const book = await BookServices.getBook(id);
                    setTitle(book.title);
                    setAuthor(book.author);
                    setPrice(book.price);
                    setGenre(book.genre?._id);
                    setDescription(book.description);
                    setCopiesLeft(book.copies_left);
                    if (book.coverImage) {
                        setCoverImage(book.coverImage); 
                    }
                } catch (error) {
                    console.error('Error fetching book details:', error);
                    setMessage('Failed to load book details.');
                }
            }
        };

        fetchGenres();
        fetchBookDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !price || !genre || !copiesLeft) {
            setMessage('Please fill out all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('copies_left', copiesLeft);
        if (coverImage && typeof coverImage !== 'string') {
            formData.append('coverImage', coverImage);
        }

        try {
            if (isEdit) {
                await BookServices.updateBook(id, formData);
                setMessage('Book updated successfully!');
            } else {
                await BookServices.createBook(formData);
                setMessage('Book added successfully!');
            }
            navigate('/all-books');
        } catch (error) {
            console.error('Error saving book:', error);
            setMessage('Failed to save the book. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#f4f4f9',
                minHeight: '100vh',
                padding: '30px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    fontWeight: 'bold', // Make the font bold
                    fontFamily: 'Georgia, serif', // Custom stylish font
                }}
            >
                {isEdit ? 'Edit Book📖' : 'Add New Book📖'}
            </h2>
            {message && (
                <p
                    style={{
                        textAlign: 'center',
                        color: message.includes('successfully') ? '#28a745' : '#dc3545',
                        fontSize: '1.2rem',
                        marginBottom: '20px',
                    }}
                >
                    {message}
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Genre:</label>
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    >
                        <option value="">Select Genre</option>
                        {genres.map((g) => (
                            <option key={g._id} value={g._id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            resize: 'none',
                        }}
                    ></textarea>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Copies Left:</label>
                    <input
                        type="number"
                        value={copiesLeft}
                        onChange={(e) => setCopiesLeft(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cover Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        style={{
                            padding: '10px',
                        }}
                    />
                    {coverImage && typeof coverImage === 'string' && (
                        <div style={{ marginTop: '10px' }}>
                            <img
                                src={coverImage}
                                alt="Cover"
                                style={{ width: '100px', height: 'auto' }}
                            />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        backgroundColor: '#007bff',  // Blue button
                        color: '#fff',
                        padding: '10px',
                        fontSize: '1.2rem',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: '0.3s ease',
                    }}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.8)'} // Glow effect on hover
                    onMouseOut={(e) => e.target.style.boxShadow = 'none'}
                >
                    {isEdit ? 'Update Book' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;
