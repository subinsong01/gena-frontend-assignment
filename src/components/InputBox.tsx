import React from "react";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
}

export default function InputBox({
  id,
  label,
  type = "text",
  ...props
}: InputBoxProps) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={id} className="mb-3 text-xl">
        {label}
      </label>
      <input
        id={id}
        type={type}
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
      />
    </div>
  );
}
