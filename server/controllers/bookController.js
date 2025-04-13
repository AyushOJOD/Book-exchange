const Book = require("../models/bookModel");
const { readData, writeData } = require("../utils/fileUtils");

const BOOKS_FILE = "books.json";

// Add new book (only by owner)
const addBook = (req, res) => {
  const { title, author, genre, location, contact, ownerId } = req.body;

  if (!title || !author || !location || !contact || !ownerId) {
    return res.status(400).json({ message: "Missing required book fields." });
  }

  const books = readData(BOOKS_FILE);
  const newBook = new Book(title, author, genre, location, contact, ownerId);
  books.push(newBook);
  writeData(BOOKS_FILE, books);

  res.status(201).json({ message: "Book added successfully.", book: newBook });
};

// Get all books
const getBooks = (req, res) => {
  const books = readData(BOOKS_FILE);
  res.status(200).json(books);
};

// Get single book by ID
const getBookById = (req, res) => {
  const { id } = req.params;
  const books = readData(BOOKS_FILE);
  const book = books.find((b) => b.id == id);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  res.status(200).json(book);
};

// Mark as rented/exchanged
const updateBookStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const books = readData(BOOKS_FILE);
  const book = books.find((b) => b.id == id);

  if (!book) {
    return res.status(404).json({ message: "Book not found." });
  }

  book.status = status || "available";
  writeData(BOOKS_FILE, books);

  res.status(200).json({ message: "Book status updated.", book });
};

// Delete book
const deleteBook = (req, res) => {
  const { id } = req.params;
  const books = readData(BOOKS_FILE);
  const updatedBooks = books.filter((book) => book.id != id);
  writeData(BOOKS_FILE, updatedBooks);
  res.status(200).json({ message: "Book deleted." });
};

// Update book details
const updateBook = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const books = readData(BOOKS_FILE);
  const index = books.findIndex((b) => b.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found." });
  }

  books[index] = { ...books[index], ...updates };
  writeData(BOOKS_FILE, books);

  res.status(200).json({ message: "Book updated.", book: books[index] });
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBookStatus,
  deleteBook,
  updateBook,
};
