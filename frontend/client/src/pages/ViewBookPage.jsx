import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Book } from "lucide-react";

import ViewChapterSidebar from "../components/view/ViewChapterSidebar";
import DashboardLayout from "../components/layout/DashboardLayout";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import ViewBook from "../components/view/ViewBook";

/* ================= SKELETON ================= */
const ViewBookSkeleton = () => (
  <div className="p-6 animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/3" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);

/* ================= PAGE ================= */
const ViewBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATHS.BOOKS.GET_BY_ID(bookId)
        );
        setBook(res.data);
      } catch (error) {
        toast.error("Failed to load book");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <DashboardLayout>
        <ViewBookSkeleton />
      </DashboardLayout>
    );
  }

  /* ================= BOOK NOT FOUND ================= */
  if (!book) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Book size={40} />
          <p className="mt-3">Book not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const chapter = book.chapters[activeChapterIndex];

  /* ================= UI ================= */
  return (
    <DashboardLayout>
      <div className="h-screen flex bg-gray-50">
        {/* SIDEBAR */}
        <ViewChapterSidebar
          book={book}
          activeChapterIndex={activeChapterIndex}
          onSelectChapter={setActiveChapterIndex}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <ViewBook
            book={book}
            chapter={chapter}
            chapterIndex={activeChapterIndex}
          />
        </main>
      </div>
    </DashboardLayout>
  );
};

export default ViewBookPage;
