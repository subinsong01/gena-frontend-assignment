"use client";

import React from "react";
import { ChartType } from "@/types/chart";

interface DropdownSelectProps {
  id: string;
  label: string;
  options: readonly { value: string; label: string }[];
  value: ChartType;
  onChange?: (value: ChartType) => void;
  disabled?: boolean;
}

export default function DropdownSelect({
  id,
  label,
  options,
  value,
  onChange,
  disabled,
}: DropdownSelectProps) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={id} className="mb-3 text-xl">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value as ChartType)}
        disabled={disabled}
        className="
          border border-input-box-color rounded-lg px-4 py-3
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
