"use client";
import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}) => {
  return (
    <div className="flex w-full items-center space-x-4">
      <label htmlFor={id} className="text-sm font-semibold mx-12">
        {label}
      </label>
      <div className="flex-grow">
        <input
          type={type}
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

export default InputField;
