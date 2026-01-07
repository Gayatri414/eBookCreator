import { useState, useMemo } from "react";
import { Save, FileDown, Sparkles } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import Button from "../ui/Button";
import Dropdown, { DropdownItem } from "../ui/Dropdown";

const ChapterEditorTab = ({
  book,
  selectedChapterIndex = 0,
  onChapterChange,
  onSaveChanges,
  onGenerateChapterContent,
  isGenerating,
  onExportPDF,
  onExportDOCX,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // safety check
  if (
    selectedChapterIndex === null ||
    !book?.chapters?.[selectedChapterIndex]
  ) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chapter to start editing
      </div>
    );
  }

  const chapter = book.chapters[selectedChapterIndex];

  /* ================= MARKDOWN OPTIONS ================= */
  const mdeOptions = useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      status: false,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    }),
    []
  );

  return (
    <div
      className={`flex flex-col h-full bg-white ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="font-semibold text-gray-800">
          {chapter.title || "Untitled Chapter"}
        </h2>

        <div className="flex items-center gap-2">
          {/* AI GENERATE */}
          <Button
            variant="outline"
            onClick={() => onGenerateChapterContent(selectedChapterIndex)}
            disabled={isGenerating}
          >
            <Sparkles size={16} className="mr-2" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>

          {/* EXPORT */}
          <Dropdown
            trigger={
              <Button variant="outline">
                <FileDown size={16} className="mr-2" />
                Export
              </Button>
            }
          >
            <DropdownItem onClick={onExportPDF}>
              Export as PDF
            </DropdownItem>
            <DropdownItem onClick={onExportDOCX}>
              Export as DOCX
            </DropdownItem>
          </Dropdown>

          {/* SAVE */}
          <Button onClick={onSaveChanges}>
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* ================= EDITOR ================= */}
      <div className="flex-1 overflow-hidden">
        <SimpleMDE
          value={chapter.content || ""}
          onChange={(value) =>
            onChapterChange(selectedChapterIndex, "content", value)
          }
          options={mdeOptions}
        />
      </div>
    </div>
  );
};

export default ChapterEditorTab;
