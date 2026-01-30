import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  Sparkles,
  FileDown,
  Save,
} from "lucide-react";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";
import BookDetailsTab from "../components/editor/BookDetailsTap";

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("editor");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const fileInputRef = useRef(null);

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
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  /* ================= BOOK FIELD CHANGE ================= */
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= COVER UPLOAD ================= */
 const handleCoverUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("cover", file); //  MUST MATCH multer

  try {
    setIsUploadingCover(true);

    const res = await axiosInstance.put(
  API_PATHS.BOOKS.UPDATE_COVER(book._id),
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);


    //  UPDATE IMAGE FROM RESPONSE
    setBook((prev) => ({
      ...prev,
      coverImage: res.data.coverImage,
    }));

    toast.success("Cover image updated");
  } catch (err) {
    console.error(err);
    toast.error("Failed to upload cover image");
  } finally {
    setIsUploadingCover(false);
  }
};

  /* ================= CHAPTER CHANGE ================= */
  const handleChapterChange = (field, value) => {
    const updatedChapters = [...book.chapters];
    updatedChapters[selectedChapterIndex][field] = value;

    setBook({
      ...book,
      chapters: updatedChapters,
    });
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await axiosInstance.put(
        API_PATHS.BOOKS.UPDATE(bookId),
        book
      );
      toast.success("Changes saved");
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  /* ================= GENERATE CHAPTER (AI) ================= */
  const handleGenerateChapter = async () => {
    try {
      setIsGenerating(true);

      const activeChapter = book.chapters[selectedChapterIndex];

      if (!book?.title || !activeChapter?.title) {
        toast.error("Book title or chapter title missing");
        return;
      }

      const res = await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER,
        {
          topic: book.title,
          chapterTitle: activeChapter.title,
          chapterSummary: activeChapter.summary || "",
          style: "Informative",
          wordCount: 800,
        }
      );

      const updatedChapters = [...book.chapters];
      updatedChapters[selectedChapterIndex].content = res.data.content;

      setBook({
        ...book,
        chapters: updatedChapters,
      });

      toast.success("Chapter generated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to generate chapter"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* ================= EXPORT ================= */
  const handleExport = async (type) => {
    try {
      const url =
        type === "pdf"
          ? API_PATHS.EXPORT.PDF(bookId)
          : API_PATHS.EXPORT.DOCX(bookId);

      const response = await axiosInstance.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download =
        type === "pdf"
          ? `${book.title}.pdf`
          : `${book.title}.docx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("Failed to export book");
    }
  };

  /* ================= MARKDOWN OPTIONS ================= */
  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      status: false,
    }),
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading…
      </div>
    );
  }

  const chapter = book.chapters[selectedChapterIndex];

  return (
    <div className="h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-500 mb-4 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h2 className="font-semibold mb-3">{book.title}</h2>

        {book.chapters.map((ch, index) => (
          <button
            key={index}
            onClick={() => setSelectedChapterIndex(index)}
            className={`w-full text-left px-3 py-2 rounded text-sm ${
              index === selectedChapterIndex
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }`}
          >
            Chapter {index + 1}: {ch.title}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <div className="flex justify-between px-6 py-4 bg-white border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("editor")}
              className={
                activeTab === "editor"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }
            >
              Editor
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={
                activeTab === "details"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }
            >
              Book Details
            </button>
          </div>

          <div className="flex gap-2">
            <Dropdown
              trigger={
                <Button variant="outline">
                  <FileDown size={16} className="mr-1" />
                  Export
                </Button>
              }
            >
              <DropdownItem
                label="Export as PDF"
                onClick={() => handleExport("pdf")}
              />
              <DropdownItem
                label="Export as DOCX"
                onClick={() => handleExport("docx")}
              />
            </Dropdown>

            <Button onClick={handleSave} disabled={isSaving}>
              <Save size={16} /> Save
            </Button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "details" && (
            <BookDetailsTab
              book={book}
              onBookChange={handleBookChange}
              onCoverUpload={handleCoverUpload}
              isUploading={isUploadingCover}
              fileInputRef={fileInputRef}
            />
          )}

          {activeTab === "editor" && (
            <>
              <div className="flex items-end justify-between gap-4 mb-4">
                <div className="flex-1">
                  <InputField
                    label="Chapter Title"
                    value={chapter.title}
                    onChange={(e) =>
                      handleChapterChange("title", e.target.value)
                    }
                  />
                </div>

                <Button
                  onClick={handleGenerateChapter}
                  disabled={isGenerating}
                >
                  <Sparkles size={16} className="mr-2" />
                  {isGenerating
                    ? "Generating..."
                    : "Generate with AI"}
                </Button>
              </div>

              <SimpleMDE
                value={chapter.content}
                onChange={(value) =>
                  handleChapterChange("content", value)
                }
                options={mdeOptions}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditorPage;
