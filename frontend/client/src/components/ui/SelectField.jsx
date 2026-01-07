import React from "react";

const SelectField = ({
  icon: Icon,
  label,
  name,
  value,
  options = [],
  onChange,
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

      {/* Select wrapper */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {/* Select */}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
          className={`w-full h-11 px-3 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            Icon ? "pl-10" : ""
          }`}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value ?? option}
            >
              {option.label ?? option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
