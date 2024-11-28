import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS + Popper.js

import Home from './home/Home';
import GenreList from './genres/GenreList';
import BooksList from './books/BooksList';
import CompactBooksList from './books/CompactBooksList';
import AddBook from './books/AddBook';
import BookDetail from './books/BookDetail';

const App = () => {
  return (
<div>
  <Router>
  
<Routes>

<Route path="/" element={<Home />} exact />
<Route path="/all-genres" element={<GenreList />} exact />

<Route path="/all-books" element={<BooksList />} exact />
<Route path="/compact-books" element={<CompactBooksList />} exact />
<Route path="/add-book" element={<AddBook />} exact />
<Route path="/edit-book/:id" element={<AddBook />} exact />
<Route path="/all-books/:id" element={<BookDetail />} exact />


</Routes>



  </Router>







</div>
  );
}

export default App;