"use client";
import React from "react";

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex w-full items-center space-x-4">
      <label htmlFor={id} className="text-sm font-semibold m-6">
        {label}
      </label>
      <div className="flex-grow">
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="text-red-500 text-xs">{error}</div>
    </div>
  );
};

export default TextareaField;
