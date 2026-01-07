const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
} = require("../controllers/bookController.js");

const protect = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

// apply protect middleware to all routes
router.use(protect);

// create & get books
router.route("/")
  .post(createBook)
  .get(getBooks);

// update book cover (MUST be before :id)
router.route("/cover/:id")
  .put(upload, updateBookCover);

// get / update / delete by id
router.route("/:id")
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
