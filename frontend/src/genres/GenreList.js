import React, { useEffect, useState } from 'react';
import GenreServices from './GenreServices'; // Import GenreServices to call API

const GenreList = () => {
    const [genres, setGenres] = useState([]); // State to hold fetched genres
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch all genres when the component mounts
        GenreServices.getAllGenres()
            .then((data) => {
                setGenres(data); // Set genres data to state
            })
            .catch((err) => {
                setError('Failed to fetch genres'); // Set error message if API call fails
                console.error('Error fetching genres:', err);
            });
    }, []); // Empty dependency array means it runs only once when the component mounts

    return (
        <div
            style={{
                backgroundColor: '#f9f9f9', // Light background for contrast
                minHeight: '100vh',
                padding: '20px 40px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    color: '#000000',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                }}
            >
                Explore Genres📚
            </h1>

            {error && (
                <p
                    style={{
                        color: 'red',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        marginBottom: '20px',
                    }}
                >
                    {error}
                </p>
            )}

            {genres.length === 0 ? (
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        color: '#555',
                        marginTop: '50px',
                    }}
                >
                    No genres available.
                </p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid layout
                        gap: '20px',
                        padding: '20px',
                    }}
                >
                    {genres.map((genre) => (
                        <div
                            key={genre._id}
                            style={{
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                border: '1px solid #ddd',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow =
                                    '0 8px 16px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow =
                                    '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <h3
                                style={{
                                    color: '#333',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                }}
                            >
                                {genre.name}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreList;
