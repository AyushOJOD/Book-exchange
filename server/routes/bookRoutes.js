const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
  getBookById,
  updateBookStatus,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// POST /api/books/add
router.post("/add", addBook);

// GET /api/books
router.get("/", getBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// PATCH /api/books/:id/status
router.patch("/:id/status", updateBookStatus);

// PATCH /api/books/:id
router.patch("/:id", updateBook);

// DELETE /api/books/:id
router.delete("/:id", deleteBook);

module.exports = router;
