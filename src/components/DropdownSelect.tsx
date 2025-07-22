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
      <label htmlFor={id} className="mb-4 font-bold text-xl">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-color"
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
