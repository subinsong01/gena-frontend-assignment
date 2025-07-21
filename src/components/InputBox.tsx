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
      <label htmlFor={id} className="mb-4 font-bold text-3xl">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...props}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-color"
      />
    </div>
  );
}
