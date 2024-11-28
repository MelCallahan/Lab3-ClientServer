const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database');
const bookRoutes = require('./routes/bookRoutes');
const genreRoutes = require('./routes/genreRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set EJS as the view engine (if needed for server-side rendering)
// app.set('view engine', 'ejs');

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files
app.use('/api/books', bookRoutes); // Books API routes
app.use('/api/genres', genreRoutes); // Genres API routes
app.use('/api/users', userRoutes); // User-related API routes

// Health check endpoint
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// MongoDB connection

// Error handling middleware (for better debugging and robustness)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 5000;  // Change port to 5000 to avoid conflict with frontend
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
