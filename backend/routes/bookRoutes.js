const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.use(protect);

//  CREATE & GET
router.route("/")
  .post(createBook)
  .get(getBooks);

// MUST BE ABOVE `/:id`
router.put(
  "/cover/:id",
  upload,
  updateBookCover
);

//  ID ROUTES (LAST)
router.route("/:id")
  .get(getBookById)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
