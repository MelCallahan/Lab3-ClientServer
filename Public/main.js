const API_URL = 'http://localhost:5000/api/books';

// Fetch all books from the API
const fetchBooks = async () => {
    try {
        const response = await axios.get(API_URL); // Fetch books
        displayBooks(response.data); // Display books
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

// Display books on the page
const displayBooks = (books) => {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = ''; // Clear previous content

    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item');

        const coverImage = book.coverImage
            ? `<img src="/uploads/${book.coverImage}" alt="${book.title}" class="book-cover" />`
            : '';
        const bookInfo = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Price: $${book.price}</p>
            <p>Copies Left: ${book.copies_left}</p>
            <p>Genre: ${book.genre?.name || 'N/A'}</p>
            ${coverImage}
        `;
        bookDiv.innerHTML = bookInfo;

        // Add Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => openEditForm(book); // Attach book data to the edit form
        bookDiv.appendChild(editButton);

        // Add Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteBook(book._id); // Delete book functionality
        bookDiv.appendChild(deleteButton);

        booksContainer.appendChild(bookDiv);
    });
};

// Open the edit form with book details pre-filled
const openEditForm = (book) => {
    const form = document.getElementById('add-book-form');
    form.title.value = book.title;
    form.author.value = book.author;
    form.price.value = book.price;
    form.genre.value = book.genre._id || ''; // Handle genre ID
    form.copies_left.value = book.copies_left;
    form.dataset.bookId = book._id; // Attach the book's ID to the form

    document.getElementById('submit-button').textContent = 'Update Book'; // Change button text
};

// Delete a book
const deleteBook = async (BOOK_ID) => {
    try {
        await axios.delete(`${API_URL}/${BOOK_ID}`);
        alert('Book deleted successfully!');
        fetchBooks(); // Refresh the list after deleting
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

// Add or update a book
const addBook = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const bookId = form.dataset.bookId;

    try {
        if (bookId) {
            // Update existing book
            await axios.put(`${API_URL}/${bookId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Book updated successfully!');
            document.getElementById('submit-button').textContent = 'Add Book';
            form.removeAttribute('data-book-id');
        } else {
            // Add a new book
            await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Book added successfully!');
        }
        fetchBooks(); // Refresh book list
        form.reset();
    } catch (error) {
        console.error('Error adding/updating book:', error);
    }
};

// Fetch genres for the dropdown
const fetchGenres = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/genres');
        const genres = response.data;
        const genreSelect = document.getElementById('genre');
        genres.forEach((genre) => {
            const option = document.createElement('option');
            option.value = genre._id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
};

// Initial fetches
document.getElementById('view-books-button').addEventListener('click', fetchBooks);
document.getElementById('add-book-form').addEventListener('submit', addBook);
fetchGenres();
