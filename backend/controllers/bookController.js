const Book = require("../models/Book");

// @desc    Create a new book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const { title, subtitle, chapters } = req.body;

    //  Validate
    if (!title) {
      return res.status(400).json({
        message: "Please provide a title",
      });
    }

    // Create book (ONLY ONCE)
    const book = await Book.create({
      userId: req.user._id,        // user from auth middleware
      title,
      subtitle,
      author: req.user.name,       //  auto author
      chapters,
    });
     res.status(201).json(book);
  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all books for logged-in user
// @route   GET /api/books
// @access  Private
const getBooks = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const books = await Book.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Private
const getBookById = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== userId.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to view this book" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update book cover image
// @route   PUT /api/books/cover/:id
// @access  Private
const updateBookCover = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Cloudinary URL
    book.coverImage = req.file.path;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
};
