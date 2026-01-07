import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  isUploading,
  fileInputRef,
}) => {
  const coverImageUrl =
    book?.coverImage?.startsWith("http")
      ? book.coverImage
      : book?.coverImage
      ? `${BASE_URL}/${book.coverImage}`.replace(/\\/g, "/")
      : null;

  return (
    <div className="space-y-6">
      {/* COVER IMAGE */}
      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>

        <div className="flex items-center gap-4">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="Cover"
              className="w-32 h-40 object-cover rounded border"
            />
          ) : (
            <div className="w-32 h-40 flex items-center justify-center border rounded text-gray-400">
              No Cover
            </div>
          )}

          <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={onCoverUpload}
            />

            <Button
              variant="outline"
              onClick={() => fileInputRef.current.click()}
              disabled={isUploading}
            >
              <UploadCloud className="mr-2" size={16} />
              {isUploading ? "Uploading..." : "Change Cover"}
            </Button>
          </div>
        </div>
      </div>

      {/* BOOK TITLE */}
      <InputField
        label="Book Title"
        name="title"
        value={book.title}
        onChange={onBookChange}
      />
    </div>
  );
};

export default BookDetailsTab;
