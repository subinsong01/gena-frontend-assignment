"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  to?: string;
}

export default function PrimaryButton({
  type = "submit",
  children = "create",
  to,
  ...props
}: PrimaryButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault();
      router.push(to);
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      type={type}
      {...props}
      onClick={handleClick}
      className="rounded-md py-2 px-4 cursor-pointer bg-black hover:bg-neutral-700 transition"
    >
      <span className="text-white font-normal">{children}</span>
    </button>
  );
}
