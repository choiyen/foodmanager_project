import React from "react";

interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  id,
  name,
  placeholder,
  required,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onchange}
    />
  );
}
