import React, { useState, useRef, useEffect } from "react";

/* ================= DROPDOWN ================= */
const Dropdown = ({ trigger, children, align = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 min-w-[160px] rounded-md border bg-white shadow-lg
          ${align === "right" ? "right-0" : "left-0"}
        `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/* ================= DROPDOWN ITEM ================= */
export const DropdownItem = ({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default Dropdown;
