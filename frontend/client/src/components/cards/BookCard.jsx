import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>

      <div className="flex justify-end gap-3 mt-4">
        {/* ✅ EDIT → FRONTEND ROUTE */}
        <button
          onClick={() => navigate(`/editor/${book._id}`)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Edit size={18} />
        </button>

        {/* DELETE */}
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
