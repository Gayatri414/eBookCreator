import React from "react";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          className={`
            w-full h-11 px-3 py-2 border border-gray-200 rounded-xl
            bg-white text-sm text-gray-900
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-violet-500
            ${Icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
