import React from "react";

interface DropdownSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function DropdownSelect({
  id,
  label,
  options,
  ...props
}: DropdownSelectProps) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={id} className="mb-3 text-xl">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="
        border border-gray-300 rounded-lg px-4 py-3
        shadow-sm
        transition
        duration-300
        ease-in-out
        focus:outline-none
        focus:ring-1
        focus:ring-primary-color
        focus:border-primary-color
        hover:border-primary-color
        placeholder-gray-400
        text-gray-900
      "
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
