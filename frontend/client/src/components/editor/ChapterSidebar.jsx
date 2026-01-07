import React from "react";
import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../ui/Button";

/* ================= SORTABLE ITEM ================= */
const SortableItem = ({
  id,
  index,
  chapter,
  isSelected,
  onSelect,
  onDelete,
  onGenerate,
  isGenerating,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(index)}
      className={`flex items-center justify-between gap-2 p-3 rounded-lg border cursor-pointer
        ${isSelected ? "bg-violet-50 border-violet-400" : "bg-white"}
      `}
    >
      <div className="flex items-center gap-2">
        <GripVertical
          size={16}
          className="text-gray-400 cursor-grab"
          {...attributes}
          {...listeners}
        />

        <span className="text-sm font-medium truncate">
          {chapter.title || `Chapter ${index + 1}`}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onGenerate(index);
          }}
          disabled={isGenerating}
        >
          <Sparkles size={16} className="text-violet-600" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(index);
          }}
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

/* ================= CHAPTER SIDEBAR ================= */
const ChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
  onReorderChapters,
}) => {
  const navigate = useNavigate();

  if (!book) return null;

  return (
    <div className="w-80 bg-white border-r h-screen flex flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b">
        <button onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-semibold text-lg">Chapters</h2>
      </div>

      {/* CHAPTER LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            onReorderChapters(active.id, over.id);
          }}
        >
          <SortableContext
            items={book.chapters.map((_, i) => i)}
            strategy={verticalListSortingStrategy}
          >
            {book.chapters.map((chapter, index) => (
              <SortableItem
                key={index}
                id={index}
                index={index}
                chapter={chapter}
                isSelected={selectedChapterIndex === index}
                onSelect={onSelectChapter}
                onDelete={onDeleteChapter}
                onGenerate={onGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <Button
          className="w-full"
          onClick={onAddChapter}
          icon={Plus}
        >
          Add Chapter
        </Button>
      </div>
    </div>
  );
};

export default ChapterSidebar;
