import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/modals/CreateBookModal";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(API_PATHS.BOOKS.GET_ALL);
      setBooks(res.data || []);
    } catch (error) {
      toast.error("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* ================= DELETE BOOK ================= */
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axiosInstance.delete(API_PATHS.BOOKS.DELETE(bookId));
      toast.success("Book deleted");
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <DashboardLayout>
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My eBooks</h1>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create eBook
        </Button>
      </div>

      {/* ================= CONTENT ================= */}
      {isLoading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
          <Book className="w-12 h-12 mb-4 text-gray-400" />
          <p className="mb-2">No books yet</p>
          <p className="text-sm">Create your first eBook to get started</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={() => handleDeleteBook(book._id)}
            />
          ))}
        </div>
      )}

      {/* ================= CREATE BOOK MODAL ================= */}
      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBookCreated={(newBook) =>
          setBooks((prev) => [newBook, ...prev])
        }
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
