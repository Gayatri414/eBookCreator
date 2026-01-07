import React from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

const ViewBook = ({ book }) => {
  if (!book) return null;

  // Resolve cover image URL
  const coverImageUrl =
    book.coverImage && book.coverImage.startsWith("http")
      ? book.coverImage
      : book.coverImage
      ? `${BASE_URL}${book.coverImage}`
      : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ================= COVER ================= */}
      {coverImageUrl && (
        <div className="flex justify-center mb-8">
          <img
            src={coverImageUrl}
            alt="Book Cover"
            className="max-h-[420px] rounded-lg shadow-md object-contain"
          />
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="text-center mb-10">
        <BookOpen className="mx-auto text-purple-600 mb-3" size={32} />

        <h1 className="text-3xl font-bold text-gray-900">
          {book.title}
        </h1>

        {book.subtitle && (
          <p className="text-lg text-gray-500 mt-2">
            {book.subtitle}
          </p>
        )}

        <p className="mt-3 text-sm text-gray-600">
          By <span className="font-medium">{book.author}</span>
        </p>
      </div>

      {/* ================= CHAPTERS ================= */}
      <div className="space-y-12">
        {book.chapters.map((chapter, index) => (
          <div key={chapter._id}>
            <h2 className="text-2xl font-semibold mb-4">
              Chapter {index + 1}: {chapter.title}
            </h2>

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>
                {chapter.content || "*No content available*"}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBook;
