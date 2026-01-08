import { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Plus,
  ArrowLeft,
} from "lucide-react";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
   const { user } = useAuth();  
  const [step, setStep] = useState(1);

  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(5);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");

  const [chapters, setChapters] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  /* ================= RESET & CLOSE ================= */
  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(5);
    setAiTopic("");
    setAiStyle("Informative");
    setChapters([]);
    setIsGenerating(false);
    setIsCreating(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  /* ================= STEP 1: GENERATE OUTLINE ================= */
  const handleGenerateOutline = async () => {
    if (!bookTitle.trim()) {
      toast.error("Book title is required");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await axiosInstance.post(
        API_PATHS.AI.GENERATE_OUTLINE,
        {
          topic: aiTopic || bookTitle,
          numChapters,
          style: aiStyle,
        }
      );

      // ✅ AI returns ARRAY
      setChapters(
        res.data.map((ch, index) => ({
          title: ch.title || `Chapter ${index + 1}`,
          content: "", // content generated later
        }))
      );

      setStep(2);
    } catch (err) {
      console.error("Generate outline error:", err);
      toast.error(
        err.response?.data?.message || "Failed to generate outline"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* ================= ADD CHAPTER ================= */
  const handleAddChapter = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: `Chapter ${prev.length + 1}`,
        content: "",
      },
    ]);
  };

  /* ================= CREATE BOOK ================= */
  const handleCreateBook = async () => {
  if (!chapters.length) {
    toast.error("Add at least one chapter");
    return;
  }

  setIsCreating(true);
  try {
    const res = await axiosInstance.post(
      API_PATHS.BOOKS.CREATE,
      {
        title: bookTitle,
        author: user?.name || "Unknown Author", // ✅ FIX
        chapters: chapters.map((ch) => ({
          title: ch.title,
          content: ch.content || " ",
        })),
      }
    );

    toast.success("eBook created successfully");
    onBookCreated?.(res.data);
    handleClose();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to create book"
    );
  } finally {
    setIsCreating(false);
  }
};


  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-600" />
          Create New eBook
        </h2>
        <span className="text-sm text-gray-500">{step} / 2</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <div
          className="h-1 bg-violet-600 rounded-full transition-all"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="space-y-4">
          <InputField
            icon={BookOpen}
            label="Book Title"
            placeholder="Enter your book title..."
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />

          <InputField
            label="Number of Chapters"
            type="number"
            min={1}
            value={numChapters}
            onChange={(e) => setNumChapters(Number(e.target.value))}
          />

          <InputField
            label="Topic (Optional)"
            placeholder="Specific topic for AI generation..."
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
          />

          <SelectField
            label="Writing Style"
            value={aiStyle}
            onChange={(e) => setAiStyle(e.target.value)}
            options={[
              "Informative",
              "Storytelling",
              "Motivational",
              "Technical",
            ]}
          />

          <Button
            className="w-full mt-4"
            onClick={handleGenerateOutline}
            isLoading={isGenerating}
          >
            Generate Outline
          </Button>
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-medium">Review Chapters</h3>

          <div className="space-y-2">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm"
              >
                {ch.title}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              icon={ArrowLeft}
              onClick={() => setStep(1)}
            >
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon={Plus}
                onClick={handleAddChapter}
              >
                Add Chapter
              </Button>

              <Button
                onClick={handleCreateBook}
                isLoading={isCreating}
              >
                Create eBook
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;
