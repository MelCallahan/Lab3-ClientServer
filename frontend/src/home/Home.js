import React from 'react';
import { Link } from 'react-router-dom';
import CompactBooksList from '../books/CompactBooksList';

const Home = () => {
  return (
    <div className="container mt-5">
      {/* Embedded CSS for styling */}
      <style>
        {`
          /* Glow effect on buttons */
          .glow-effect {
            transition: all 0.3s ease;
          }

          .glow-effect:hover {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.8);
            background-color: #0044cc;
            border: none;
          }

          /* Optional: you can add custom fonts or adjust further */
          body {
            font-family: 'Arial', sans-serif;
          }

          /* Title and subheading styles */
          .main-title {
            font-weight: bold;
            color: #333;
          }

          .sub-title {
            font-style: italic;
            color: #6c757d;
            margin-top: 15px;
          }
        `}
      </style>

      <div className="text-center mb-5">
        {/* Main Heading */}
        <h1 className="display-4 main-title">Book Hub</h1>
        {/* Subheading */}
        <h2 className="sub-title">Read Books, Be Kind, Stay Weird📖</h2>
      </div>

      {/* Grid Layout for Buttons */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

        {/* Manage Genres Button */}
        <div className="col d-flex justify-content-center">
          <div className="card shadow-sm rounded-3 w-100">
            <div className="card-body text-center">
              <Link to="/all-genres" className="text-decoration-none">
                <button className="btn btn-secondary btn-lg w-100 glow-effect">
                  View Genres
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* View Books Button */}
        <div className="col d-flex justify-content-center">
          <div className="card shadow-sm rounded-3 w-100">
            <div className="card-body text-center">
              <Link to="/all-books" className="text-decoration-none">
                <button className="btn btn-success btn-lg w-100 glow-effect">
                  View Books
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Add Book Button */}
        <div className="col d-flex justify-content-center">
          <div className="card shadow-sm rounded-3 w-100">
            <div className="card-body text-center">
              <Link to="/add-book" className="text-decoration-none">
                <button className="btn btn-primary btn-lg w-100 glow-effect">
                  Add Book
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Display Books List (CompactBooksList) */}
      <CompactBooksList />
    </div>
  );
};

export default Home;
