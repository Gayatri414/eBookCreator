import React from "react";
import { BookOpen } from "lucide-react";

const ViewChapterSidebar = ({
  book,
  activeChapterIndex,
  onSelectChapter,
}) => {
  if (!book) return null;

  return (
    <aside className="w-72 bg-white border-r p-4 overflow-y-auto">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen size={18} />
          {book.title}
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          {book.chapters.length} Chapters
        </p>
      </div>

      {/* CHAPTER LIST */}
      <div className="space-y-1">
        {book.chapters.map((chapter, index) => (
          <button
            key={chapter._id}
            onClick={() => onSelectChapter(index)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition
              ${
                activeChapterIndex === index
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <span className="block text-xs text-gray-400">
              Chapter {index + 1}
            </span>
            <span className="block truncate">
              {chapter.title}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ViewChapterSidebar;
