// LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div
        className={`animate-spin rounded-full border-t-primary border-gray-300 ${sizeClasses[size]}`}
      ></div>
      {text && <p className="mt-3 text-gray-500 text-sm">{text}</p>}
    </div>
  );
}
